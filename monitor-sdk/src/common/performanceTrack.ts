import { metricsName, PageInformation, performanceType, userAgent } from "../type";
import parser from 'ua-parser-js';
import bowser from 'bowser';
import {lazyReport} from "@/common/report";

export function getPerformance(): void {
    console.log('%c%s', 'font-size: 24px; color: green', '开始监控网页性能');

    window.addEventListener('click', (e) => {
        getClickInform(e);
        getPerformanceTiming();
    }, true);
    window.addEventListener('load', () => {
        getPv();
    }, true);

    // 获取 userAgent 信息，如：用户设备类型，浏览器版本，webview引擎类型
    const getUserAgent = function (): userAgent {
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
    const getPageInfo = function (): PageInformation {
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

    const getClickInform = function (e: MouseEvent | any): void {
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

    // 获取页面性能数据
    function getPerformanceTiming(): performanceType {
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

        const performanceLog: performanceType = {
            redirect,
            appCache,
            DNS,
            TCP,
            SSL,
            request,
            response,
            Trans,
            DOM,
            FirstByte,
            processing,
            Load,
            Res,
            DomReady,
            domParse,
            TTFB,
            FP,
            TTI,
        }
        return performanceLog;
    }
    console.log('%c%s%o', 'color: green', '获取页面性能指标', getPerformanceTiming())


    function getPv() {
        const pvLog = {
            type: "pv",
            startTime: performance.now(),
            pageURL: window.location.href,
            referrer: document.referrer,
            uuid: 0,
        }
        console.log('%c%s%o', 'color: green', '获取 pv', pvLog)
        lazyReport('/pv', pvLog);
    }
}