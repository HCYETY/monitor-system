import { metricsName, PageInformation, routeType, userAgent } from "@type/index";
import { lazyReport } from "@monitor/report/index";
import bowser from "bowser";
import parser from "ua-parser-js";

window.addEventListener('click', (e) => {
  getClickInform(e);
}, true);

// 获取 userAgent 信息，如：用户设备类型，浏览器版本，webview引擎类型
export const getUserAgent = function (): userAgent {
  const browserData = bowser.parse(navigator.userAgent);
  const parserData = parser(navigator.userAgent);

  const browserName = browserData.browser.name || parserData.browser.name; // 浏览器名
  const browserVersion = browserData.browser.version || parserData.browser.version; // 浏览器版本号
  const osName = browserData.os.name || parserData.os.name; // 操作系统名
  const osVersion = parserData.os.version || browserData.os.version; // 操作系统版本号
  const deviceType = browserData.platform.type || parserData.device.type; // 设备类型
  const deviceVendor = browserData.platform.vendor || parserData.device.vendor || ''; // 设备所属公司
  const deviceModel = browserData.platform.model || parserData.device.model || ''; // 设备型号
  const engineName = browserData.engine.name || parserData.engine.name; // engine名
  const engineVersion = browserData.engine.version || parserData.engine.version; // engine版本号
  const cpuArchitecture = parserData.cpu.architecture;
  const ua = parserData.ua;

  const userAgentObj: userAgent = {
    browserName,
    browserVersion,
    osName,
    osVersion,
    deviceType,
    deviceVendor,
    deviceModel,
    engineName,
    engineVersion,
    cpuArchitecture,
    ua
  }
  return userAgentObj;
}
console.log('%c%s%o', 'color: green', '获取 userAgent 信息，如：用户设备类型，浏览器版本，webview引擎类型', getUserAgent());

// 获取 PI 页面基本信息
export const getPageInfo = function (): PageInformation {
  const {
    host,
    hostname,
    href,
    protocol,
    origin,
    port,
    pathname,
    search,
    hash
  } = window.location;
  const { width, height } = window.screen;
  const docWidth = document.documentElement.clientWidth || document.body.clientWidth;
  const docHeight = document.documentElement.clientHeight || document.body.clientHeight;
  const { language } = navigator;
  const userAgent = getUserAgent();

  const pageInfoObj: PageInformation = {
    host,
    hostname,
    href,
    protocol,
    origin,
    port,
    pathname,
    search,
    hash,
    userAgent,
    title: document.title,
    language: language.substring(0, 2),
    winScreen: `${width} x ${height}`,
    docScreen: `${docWidth} x ${docHeight}`,
  }
  return pageInfoObj;
};

// 初始化 CBR 点击事件的获取和返回
const clickMountList = ['button'].map((x) => x.toLowerCase());
export const getClickInform = function (e: MouseEvent | any): void {
  // 这里是根据 tagName 进行是否需要捕获事件的依据，可以根据自己的需要，额外判断id\class等
  // 先判断浏览器支持 e.path ，从 path 里先取
  let target = e.path?.find((x: Element) => clickMountList.includes(x.tagName?.toLowerCase()));
  // 不支持 path 就再判断 target
  target = target || (clickMountList.includes(e.target.tagName?.toLowerCase()) ? e.target : undefined);
  if (!target) return;

  const metrics = {
    tagInfo: {
      id: target.id,
      classList: Array.from(target.classList),
      tagName: target.tagName,
      text: target.textContent,
    },
    timestamp: new Date().getTime(), // 点击的时间
    pageInfo: getPageInfo(), // 页面信息
  };
  // 除开商城业务外，一般不会特意上报点击行为的数据，都是作为辅助检查错误的数据存在;
  // this.metrics.add(metricsName.CBR, metrics);
  // 行为记录 不需要携带 完整的pageInfo
  // delete metrics.pageInfo;
  // 记录到行为记录追踪
  const behavior = {
    category: metricsName.CBR,
    data: metrics,
  };
  const oldBehavior = localStorage.getItem('click_behavior');
  let newBehavior = [];
  if (oldBehavior) {
    newBehavior = JSON.parse(oldBehavior);
  }
  newBehavior.push(behavior);
  localStorage.setItem('click_behavior', JSON.stringify(newBehavior));
  // this.breadcrumbs.push(behavior);

  console.log('%c%s%o', 'color: green', '点击事件 log数据', behavior)
  lazyReport('/hash', behavior);
};
console.log('%c%s', 'color: green', '页面点击事件已监控');


// 重写 pushState 和 replaceState 方法
const createHistoryEvent = function (name) {
    // 拿到原来的处理方法
    const origin = window.history[name];

    return function (event) {
        if (name === 'replaceState') {
            const { current } = event;
            const pathName = location.pathname;
            if (current === pathName) {
                let res = origin.apply(this, arguments);
                return res;
            }
        }

        let res = origin.apply(this, arguments);
        let e = new Event(name);
        // @ts-ignore
        e.arguments = arguments;
        window.dispatchEvent(e);
        return res;
    };
};

// history路由监听
export function historyPageTrack (): void {
    console.log('%c%s', 'font-size: 24px; color: skyblue', '开始监控 history 路由跳转');

    let beforeTime = Date.now(); // 进入页面的时间
    let beforeUrl: string = ''; // 上一个页面

    // 获取在某个页面的停留时间
    function getDuration(): { curTime: number, duration: number } {
        let curTime = Date.now();
        let duration = curTime - beforeTime;
        beforeTime = curTime;
        return { curTime, duration };
    }

    window.history.pushState = createHistoryEvent('pushState');
    window.history.replaceState = createHistoryEvent('replaceState');

    // 记录当前页面信息，并更新上一个页面的 endTime
    const recordBehaviors = () => {
        console.log('%c%s%s', 'color: skyblue', 'history路由跳转beforeUrl', beforeUrl);
        // let routeList: routeType[] = [];
        const currentUrl = window.location.href;
        let time = Date.now();
        // let behaviors = localStorage.getItem('current_behavior');
        const typeNum = window.performance?.navigation.type;
        let type = '';
        switch (typeNum) {
            case 0:
                type = '点击链接、地址栏输入、表单提交、脚本操作等';
                break;
            case 1:
                type = '点击重新加载按钮、location.reload';
                break;
            case 2:
                type = '点击前进或后退按钮';
                break;
            case 3:
                type = '任何其他来源。即非刷新/非前进后退、非点击链接/地址栏输入/表单提交/脚本操作等';
                break;
        }
        const routeTemplate: routeType = {
            beforeUrl,
            currentUrl,
            type,
            startTime: time,
            duration: getDuration().duration,
            endTime: getDuration().curTime,
        }
        beforeUrl = currentUrl;
        // if (behaviors) {
        //     routeList = JSON.parse(behaviors);
        //     const len = routeList.length;
        //     if (len > 0) {
        //         routeList[len - 1].endTime = time;
        //         routeList[len - 1].duration = time - routeList[len - 1].startTime;
        //     }
        // }
        // routeList.push(routeTemplate);
        console.log('%c%s%o', 'color: skyblue', 'routeTemplate', routeTemplate);
        lazyReport('/history', routeTemplate);
        // localStorage.setItem('current_behavior', JSON.stringify(routeList));
    }

    [
        // history.go()、history.back()、history.forward() 监听
        'popstate',
        // history.pushState() 监听
        'pushState',
        // history.replaceState() 监听
        'replaceState',
        // 页面 load 监听
        'load',
        // 页面 beforeunload 监听
        'beforeunload'
    ].map((type: string) => {
        window.addEventListener(type, function () {
            if (type === 'beforeunload') {
                // 上报
            }
            recordBehaviors();
        })
    });
}

// hash路由监听
export function hashPageTrack (): void {
    console.log('%c%s', 'font-size: 24px; color: skyblue', '开始监控 hash 路由跳转');

    let beforeTime: number = Date.now(); // 进入页面的时间
    let beforeUrl: string = ''; // 上一个页面

    // 获取在某个页面的停留时间
    function getDuration(): { curTime: number, duration: number } {
        let curTime: number = Date.now();
        let duration: number = curTime - beforeTime;
        beforeTime = curTime;
        return { curTime, duration };
    }

    // 记录当前页面信息，并更新上一个页面的 endTime
    const recordBehaviors = function (): void {
        const currentUrl: string = window.location.href;
        let time: number = Date.now();
        const typeNum: number = window.performance?.navigation.type;
        let type: string = '';
        switch (typeNum) {
            case 0:
                type = '点击链接、地址栏输入、表单提交、脚本操作等';
                break;
            case 1:
                type = '点击重新加载按钮、location.reload';
                break;
            case 2:
                type = '点击前进或后退按钮';
                break;
            case 3:
                type = '任何其他来源。即非刷新/非前进后退、非点击链接/地址栏输入/表单提交/脚本操作等';
                break;
        }
        const routeTemplate: routeType = {
            beforeUrl,
            currentUrl,
            type,
            startTime: time,
            duration: getDuration().duration,
            endTime: getDuration().curTime,
        }
        beforeUrl = currentUrl;
        lazyReport('/hash', routeTemplate);
        console.log('%c%s%o', 'color: skyblue', 'routeTemplate', routeTemplate);
    }

    window.history.pushState = createHistoryEvent('pushState');

    [
        // history.hash() 监听
        'hashchange',
        // history.pushState() 监听
        'pushState',
        // 页面 load 监听
        'load',
        // 页面 beforeunload 监听
        'beforeunload'
    ].map((type: string) => {
        window.addEventListener(type, function () {
            recordBehaviors();
        })
    });
}
