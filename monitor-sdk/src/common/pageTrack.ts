import {metricsName, PageInformation} from "../type";
import parser from 'ua-parser-js';

export function getUserAgent () {
    return parser();
}

// 获取 PI 页面基本信息
export function getPageInfo (): PageInformation  {
    const { host, hostname, href, protocol, origin, port, pathname, search, hash } = window.location;
    const { width, height } = window.screen;
    const { language } = navigator;
    const userAgent = getUserAgent();
    return {
        host,
        hostname,
        href,
        protocol,
        origin,
        port,
        pathname,
        search,
        hash,
        title: document.title,
        language: language.substring(0, 2),
        userAgent,
        winScreen: `${width} x ${height}`,
        docScreen: `${document.documentElement.clientWidth || document.body.clientWidth}x${
            document.documentElement.clientHeight || document.body.clientHeight
        }`,
    };
};

// 初始化 CBR 点击事件的获取和返回
const clickMountList = ['button'].map((x) => x.toLowerCase());
// export const getClickInform = function (mountList: Array<string>): void {
    const getClickInform = (e: MouseEvent | any) => {
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
            // 创建时间
            timestamp: new Date().getTime(),
            // 页面信息
            pageInfo: getPageInfo(),
        };
        // 除开商城业务外，一般不会特意上报点击行为的数据，都是作为辅助检查错误的数据存在;
        // this.metrics.add(metricsName.CBR, metrics);
        // 行为记录 不需要携带 完整的pageInfo
        // delete metrics.pageInfo;
        // 记录到行为记录追踪
        const behavior = {
            category: metricsName.CBR,
            data: metrics,
            // ...this.getExtends(),
        };
        console.log('点击事件 log数据', behavior)
        const oldBehavior = localStorage.getItem('click_behavior');
        let newBehavior = [];
        if (oldBehavior) {
            newBehavior = JSON.parse(oldBehavior);
        }
        newBehavior.push(behavior);
        localStorage.setItem('click_behavior', JSON.stringify(newBehavior));
        // this.breadcrumbs.push(behavior);
    };
    window.addEventListener(
        'click',
        (e) => {
            console.log('aaa')
            getClickInform(e);
        },
        true,
    );
// }

export function getPerformanceTiming () {
    const {
        redirectStart, redirectEnd,
        domainLookupStart, domainLookupEnd,
        fetchStart,
        connectStart, connectEnd,
        secureConnectionStart,
        responseStart, responseEnd,
        requestStart,
        domComplete,
        domLoading,
        loadEventStart, loadEventEnd,
        domInteractive,
        navigationStart,
        domContentLoadedEventEnd,
        // domContentLoaded,
        // domContentLoaded,
        // } = window.performance.getEntriesByType('navigation');
    } = window.performance.timing;
    const redirect = redirectEnd - redirectStart; // 重定向
    const appCache = domainLookupStart - fetchStart; // 缓存
    const DNS = domainLookupEnd - domainLookupStart; // DNS 解析耗时
    const TCP = connectEnd - connectStart; // TCP 连接耗时
    const SSL = connectEnd - secureConnectionStart; // SSL 握手
    const request = responseStart - requestStart; // 请求耗时
    const response = responseEnd - responseStart; // 响应耗时
    const Trans = responseEnd - responseStart; // 内容传输耗时
    const DOM = domInteractive - responseEnd; // DOM解析耗时
    const FirstByte = responseStart - domainLookupStart; // 首包时间
    const processing = domComplete - domLoading;
    const Load = loadEventStart - fetchStart; // 页面完全加载时间
    const Res = loadEventStart - domContentLoadedEventEnd; // 资源加载耗时
    const DomReady = domContentLoadedEventEnd - fetchStart;
    const domParse = domInteractive - responseEnd; // DOM 解析耗时
    const TTFB = responseStart - requestStart;
    // const TTFB = responseStart - navigationStart;
    const FP = responseEnd - fetchStart; // 首次渲染时间 / 白屏时间
    const TTI = domInteractive - fetchStart; // 首次可交互时间
    // const ready = domContentLoaded - fetchStart; // HTML 加载完成时间
    // const resourceLoad = domComplete - domContentLoaded;
    console.log('!', {
        redirect: redirectEnd - redirectStart, // 重定向
        appCache: domainLookupStart - fetchStart, // 缓存
        DNS: domainLookupEnd - domainLookupStart, // DNS 解析
        TCP: connectEnd - connectStart, // TCP 连接耗时
        SSL: connectEnd - secureConnectionStart, // SSL 握手
        request: responseStart - requestStart, // 请求耗时
        response: responseEnd - responseStart, // 响应耗时
        Trans: responseEnd - responseStart, // 内容传输耗时
        DOM: domInteractive - responseEnd, // DOM解析耗时
        FirstByte: responseStart - domainLookupStart, // 首包
        processing: domComplete - domLoading,
        Load: loadEventStart - fetchStart, // 页面完全加载时间
        Res: loadEventStart - domContentLoadedEventEnd, //
        DomReady: domContentLoadedEventEnd - fetchStart,
        domParse: domInteractive - responseEnd, // DOM 解析耗时
        TTFB: responseStart - requestStart,
        FP: responseEnd - fetchStart, // 首次渲染时间 / 白屏时间
        TTI: domInteractive - fetchStart, // 首次可交互时间
    })
}


// import Bowser from 'bowser';
// export function getFeature(userAgent) {
//     const browserData = Bowser.parse(userAgent);
//     const parserData = parser(userAgent);
//     const browserName = browserData.browser.name || parserData.browser.name; // 浏览器名
//     const browserVersion = browserData.browser.version || parserData.browser.version; // 浏览器版本号
//     const osName = browserData.os.name || parserData.os.name; // 操作系统名
//     const osVersion = parserData.os.version || browserData.os.version; // 操作系统版本号
//     const deviceType = browserData.platform.type || parserData.device.type; // 设备类型
//     const deviceVendor = browserData.platform.vendor || parserData.device.vendor || ''; // 设备所属公司
//     const deviceModel = browserData.platform.model || parserData.device.model || ''; // 设备型号
//     const engineName = browserData.engine.name || parserData.engine.name; // engine名
//     const engineVersion = browserData.engine.version || parserData.engine.version; // engine版本号
//     return {
//         browserName,
//         browserVersion,
//         osName,
//         osVersion,
//         deviceType,
//         deviceVendor,
//         deviceModel,
//         engineName,
//         engineVersion,
//     };
// }

export const getPv = function () {
    const pvLog = {
        kind: "business",
        type: "pv",
        startTime: performance.now(),
        pageURL: window.location.href,
        referrer: document.referrer,
        uuid: 0,
    }
    console.log('pvLog', pvLog)
}