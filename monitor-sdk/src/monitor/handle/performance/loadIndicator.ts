// 获取页面加载指标
import {getBasicParams} from "@config/constant";
import {lazyReport} from "@monitor/report/index";

let isLoaded = false;
let loadedTime = 0;
export function getLoadIndicator () {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    const entries = list.getEntries() as PerformanceNavigationTiming[];
    for (const entry of entries) {
      if (entry.name === window.location.href) {
        observer.disconnect();
        const loadIndicator = {
          ...getBasicParams,
          value: entry.loadEventStart,
        };
        console.log('页面加载指标', loadIndicator);
        lazyReport('/load-indicator', loadIndicator);
        loadedTime = entry.loadEventStart;
        isLoaded = true;
        observer.disconnect();
      }
    }
  };
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "navigation", buffered: true });
}
