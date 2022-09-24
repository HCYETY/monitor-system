// 获取页面基本性能数据
import { performanceType } from "@type/index";
import {EntryTypes, getBasicParams, PerformanceInfoType} from "@config/constant";

export interface basicIndicatorObj {
  FP: object,
  FCP: object,
  LCP: object,
  FID: number,
  CLS: number,
};

export interface PerformanceLayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

export function getBasicIndicator() {

  let basicIndicator: basicIndicatorObj = {
    FP: {},
    FCP: {},
    LCP: {},
    FID: 0,
    CLS: 0,
  };

  // 获取 FP 、 FCP 、 LCP 、 CLS 的函数
  const getFpOrFcp = (type: string, entriesByName?: string) => {
    let isLCPDone = false;
    let clsScore = 0;

    const callback = (entryList: PerformanceObserverEntryList) => {
      if (typeof entriesByName === 'string') {
        for (const entry of entryList.getEntriesByName(entriesByName)) {
          const indicator = {
            ...getBasicParams,
            value: entry.startTime
          };

          if (entriesByName === PerformanceInfoType.FP) {
            basicIndicator.FP = indicator;
          } else if (entriesByName === PerformanceInfoType.FCP) {
            basicIndicator.FCP = indicator;
          } else if (entriesByName === '') {
            basicIndicator.LCP = indicator;
            isLCPDone = true;
          }

        }
      } else {
        const entries = entryList.getEntries() as PerformanceLayoutShift[];
        for (const entry of entries) {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
            basicIndicator.CLS = clsScore;
            console.log('cls增加了')
          }
        }
      }

      // 上报数据，注意上报的时机
      console.log('basicIndicator', basicIndicator);
      observer.disconnect();
    }

    const observer = new PerformanceObserver(callback);
    observer.observe({ type, buffered: true });
  }

  // FP
  getFpOrFcp(EntryTypes.paint, PerformanceInfoType.FP);

  // FCP
  getFpOrFcp(EntryTypes.paint, PerformanceInfoType.FCP);

  // LCP
  getFpOrFcp(EntryTypes.LCP, '');

  // FID TODO
  function FID () {
    const callback = (entryList: PerformanceObserverEntryList) => {
      const firstInput = entryList.getEntries()[0];

      if (firstInput) {
        const fid = firstInput.processingStart - firstInput.startTime;
        basicIndicator.FID = fid;
      }
      // const entries = entryList.getEntries();
      // const entry = entries[entries.length - 1];
      // const fid = entry.processingStart - entry.startTime;
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
        getFpOrFcp(EntryTypes.CLS);
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
