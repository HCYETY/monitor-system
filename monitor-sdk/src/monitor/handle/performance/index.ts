import { lazyReport } from "@monitor/report/index";
import { getBasicIndicator } from "@monitor/handle/performance/basicIndicator";
import { getResourceIndicator } from "@monitor/handle/performance/resourceIndicator";
import { getDomContentLoadIndicator } from "@monitor/handle/performance/domContentLoadIndicator";
import { getFirstScreenIndicator } from "@monitor/handle/performance/firstMeaningfulPaintIndicator";
import {userInform} from "@config";

export interface performanceIndicatorObj {
  FP: number,
  FCP: number,
  LCP: number,
  FID: number,
  CLS: number,
  FMP: number,
  TTI: number,
  DCL: number,
};

export function getPerformance(): void {
  console.log('%c%s', 'font-size: 24px; color: green', '开始监控网页性能');

  let performanceIndicator: performanceIndicatorObj = {
    FP: 0,
    FCP: 0,
    LCP: 0,
    FID: 0,
    CLS: 0,
    FMP: 0,
    TTI: 0,
    DCL: 0,
  };
  const reportIndicator = {
    appId: userInform.appId,
    userID: userInform.userId,
    performanceIndicator
  }

  window.addEventListener('load', () => {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        getPv(performanceIndicator);
        getBasicIndicator(performanceIndicator);
        getFirstScreenIndicator(performanceIndicator);
        getDomContentLoadIndicator(performanceIndicator);
        getResourceIndicator(performanceIndicator);
        lazyReport('/performance-indicator', reportIndicator);
      })
    } else {
      setTimeout(function () {
        getPv(performanceIndicator);
        getBasicIndicator(performanceIndicator);
        getFirstScreenIndicator(performanceIndicator);
        getResourceIndicator(performanceIndicator);
        getDomContentLoadIndicator(performanceIndicator);
        lazyReport('/performance-indicator', reportIndicator);
      })
    }
  }, true);

  function getPv(performanceIndicator: performanceIndicatorObj) {
    const pvLog = {
      type: "pv",
      startTime: performance.now(),
      pageURL: window.location.href,
      referrer: document.referrer,
      uuid: 0,
    }
    console.log('%c%s%o', 'color: green', '获取 pv', pvLog)
    lazyReport('/pv-indicator', pvLog);
  }
}
