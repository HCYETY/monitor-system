import {lazyReport} from "@monitor/report/index";
import {performanceIndicatorObj} from "@monitor/handle/performance/index";

export type Entry = {
  startTime: number;
  roots: Node[];
};

export function getFirstScreenIndicator (performanceIndicator: performanceIndicatorObj) {
  const entries: Entry[] = [];
  const ignoreEleList: string[] = ['script', 'style', 'link', 'br', 'meta'];

  // 查看当前元素及其祖先元素是否在数组中
  function isInclude (node: Node, arr): boolean {
    if (!node || node === document.documentElement) {
      return false;
    } else if (arr.includes(node)) {
      return true;
    }
    return isInclude(node.parentNode, arr);
  }

  // 判断对应target是否在首屏中
  function isInFirstScreen (node): boolean {
    if (!node || !node.getBoundingClientRect()) {
      return false;
    }

    const rect = node.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return rect.left >= 0
      && rect.left < screenWidth
      && rect.top >= 0
      && rect.top < screenHeight;
  }

  function getFirstScreenTime (): number {
    let result: number = 0;
    entries.forEach(function (entry) {
      for (const node of entry.roots) {
        if (isInFirstScreen(node)) {
          result = entry.startTime;
          break;
        }
      }
    });

    (window.performance.getEntriesByType('resource') as PerformanceResourceTiming[])
      .forEach(function (resource) {
        if (resource.initiatorType === 'img'
          && resource.fetchStart < result
          && resource.responseEnd > result
        ) {
          result = resource.responseEnd;
        }
      });
    // 最终结果
    console.log(result);
    return result;
  }

  const callback = function (mutationList: MutationRecord[]) {
    if (!mutationList || !mutationList.forEach) return;

    performanceIndicator.FMP = getFirstScreenTime();

    const entry: Entry = {
      startTime: 0,
      roots: []
    }

    requestAnimationFrame(() => {
      entry.startTime = performance.now();
    });

    mutationList.forEach(function (mutation) {
      if (!mutation || !mutation.addedNodes || !mutation.addedNodes.forEach) return;

      mutation.addedNodes.forEach(function (node) {
        if (
          node.nodeType === 1 &&
          !ignoreEleList.includes((node as HTMLElement).tagName) &&
          !isInclude(node, entry.roots)
        ) {
          entry.roots.push(node);
        }
      })
    })
    if (entry.roots.length) {
      entries.push(entry);
    }
  }

  const observer = new MutationObserver(callback);
  // 设置观察目标，接受两个参数: target：观察目标，options：通过对象成员来设置观察选项
  // 设为 childList: true, subtree: true 表示用来监听 DOM 节点插入、删除和修改时
  observer.observe(document, {
    childList: true,
    subtree: true
  })

  // 只监听 5 s 之内的变化
  setTimeout(function () {
    // lazyReport('/first-screen-indicator', performanceIndicator);
    observer.disconnect();
  }, 5000);
}
