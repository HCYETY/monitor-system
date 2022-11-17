// 获取页面节点加载指标
import {getBasicParams} from "@config/constant";
import {lazyReport} from "@monitor/report/index";
import {performanceIndicatorObj} from "@monitor/handle/performance/index";

let isDomContentLoaded = false;
export function getDomContentLoadIndicator (performanceIndicator: performanceIndicatorObj) {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries = list.getEntries() as PerformanceNavigationTiming[];
    for (const entry of entries) {
      if (entry.name === window.location.href) {
        observer.disconnect();
        const domContentLoadIndicator = entry.domContentLoadedEventStart;
        isDomContentLoaded = true;
        console.log('页面节点加载指标', domContentLoadIndicator);
        performanceIndicator.DCL = domContentLoadIndicator;
        // lazyReport('/dom-content-load-indicator', domContentLoadIndicator);
        observer.disconnect();
      }
    }
  };
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "navigation", buffered: true });
}
