// 获取页面基本性能数据
import { EntryTypes, getBasicParams, PerformanceInfoType } from "@config/constant";
import { performanceIndicatorObj } from "@monitor/handle/performance/index";

interface PerformanceLayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

export function getBasicIndicator(performanceIndicator: performanceIndicatorObj) {
  // 获取 FP 、 FCP 、 LCP 、 CLS 的函数
  function getSimpleIndicator (type: string, entriesByName?: string) {
    let isLCPDone = false;
    let clsScore = 0;

    const callback = (entryList: PerformanceObserverEntryList) => {
      if (typeof entriesByName === 'string') {
        for (const entry of entryList.getEntriesByName(entriesByName)) {
          const indicator = entry.startTime;

          if (entriesByName === PerformanceInfoType.FP) {
            performanceIndicator.FP = indicator;
          } else if (entriesByName === PerformanceInfoType.FCP) {
            performanceIndicator.FCP = indicator;
          } else if (entriesByName === '') {
            performanceIndicator.LCP = indicator;
            isLCPDone = true;
          }

        }
      } else {
        const entries = entryList.getEntries() as PerformanceLayoutShift[];
        for (const entry of entries) {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
            performanceIndicator.CLS = clsScore;
            console.log('cls增加了')
          }
        }
      }
      observer.disconnect();
    }

    const observer = new PerformanceObserver(callback);
    observer.observe({ type, buffered: true });
  }

  // FP
  getSimpleIndicator(EntryTypes.paint, PerformanceInfoType.FP);

  // FCP
  getSimpleIndicator(EntryTypes.paint, PerformanceInfoType.FCP);

  // LCP
  getSimpleIndicator(EntryTypes.LCP, '');

  // FID TODO
  function FID () {
    const callback = (entryList) => {
      // const firstInput = entryList.getEntries()[0];
      // const fid = firstInput?.processingStart - firstInput?.startTime;
      // performanceIndicator.FID = fid;
      const entries = entryList.getEntries();
      const entry = entries[entries.length - 1];
      const fid = entry.processingStart - entry.startTime;
      performanceIndicator.FID = fid;
    }
    const observer = new PerformanceObserver(callback);
    observer.observe({ type: EntryTypes.FID, buffered: true });
  }
  FID();

  // CLS
  window.addEventListener(
    'click',
    () => {
      setTimeout(() => {
        getSimpleIndicator(EntryTypes.CLS);
      }, 1000);
    },
    true
  )

  // TTI TODO
  function getTti () {
    const tti = window.performance.timing.domInteractive - performance.timing.fetchStart;
    // const callback = (entryList) => {
    //   for (const entry of entryList.getEntries()) {
    //     if (entry.entryType === 'longtask') {
    //
    //     }
    //   }
    // }
    // const observer = new PerformanceObserver(callback);
    // observer.observe({ entryTypes: ['longtask'] });
  }


  // const {
  //   redirectStart, redirectEnd,
  //   domainLookupStart, domainLookupEnd,
  //   fetchStart,
  //   connectStart, connectEnd,
  //   secureConnectionStart,
  //   responseStart, responseEnd,
  //   requestStart,
  //   domComplete,
  //   domLoading,
  //   loadEventStart, loadEventEnd,
  //   domInteractive,
  //   navigationStart,
  //   domContentLoadedEventEnd,
  //   // domContentLoaded,
  //   // domContentLoaded,
  //   // } = window.performance.getEntriesByType('navigation');
  // } = window.performance.timing;
  // const redirect = redirectEnd - redirectStart; // 重定向
  // const appCache = domainLookupStart - fetchStart; // 缓存
  // const DNS = domainLookupEnd - domainLookupStart; // DNS 解析耗时
  // const TCP = connectEnd - connectStart; // TCP 连接耗时
  // const SSL = connectEnd - secureConnectionStart; // SSL 握手
  // const request = responseStart - requestStart; // 请求耗时
  // const response = responseEnd - responseStart; // 响应耗时
  // const Trans = responseEnd - responseStart; // 内容传输耗时
  // const DOM = domInteractive - responseEnd; // DOM解析耗时
  // const FirstByte = responseStart - domainLookupStart; // 首包时间
  // const processing = domComplete - domLoading;
  // const Load = loadEventStart - fetchStart; // 页面完全加载时间
  // const Res = loadEventStart - domContentLoadedEventEnd; // 资源加载耗时
  // const DomReady = domContentLoadedEventEnd - fetchStart;
  // const domParse = domInteractive - responseEnd; // DOM 解析耗时
  // const TTFB = responseStart - requestStart;
  // // const TTFB = responseStart - navigationStart;
  // const FP = responseEnd - fetchStart; // 首次渲染时间 / 白屏时间
  // const TTI = domInteractive - fetchStart; // 首次可交互时间
  // // const ready = domContentLoaded - fetchStart; // HTML 加载完成时间
  // // const resourceLoad = domComplete - domContentLoaded;
  //
  // const performanceLog: performanceType = {
  //   redirect,
  //   appCache,
  //   DNS,
  //   TCP,
  //   SSL,
  //   request,
  //   response,
  //   Trans,
  //   DOM,
  //   FirstByte,
  //   processing,
  //   Load,
  //   Res,
  //   DomReady,
  //   domParse,
  //   TTFB,
  //   FP,
  //   TTI,
  // }
  // return performanceLog;
}
