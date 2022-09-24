// 获取页面资源指标
import {getBasicParams} from "@config/constant";
import {lazyReport} from "@monitor/report/index";

export function getResourceIndicator () {
  const entryHandler = (list: PerformanceObserverEntryList) => {
    for (const entry of list.getEntries() as PerformanceResourceTiming[]) {
      if (entry.initiatorType !== "xmlhttprequest") {
        const resourceIndicator = {
          ...getBasicParams,
          url: entry.name, // 资源url
          duration: entry.duration, // 资源加载耗时
          dns: entry.domainLookupEnd - entry.domainLookupStart, // DNS 耗时
          tcp: entry.connectEnd - entry.connectStart, // 建立 tcp 连接耗时
          redirect: entry.redirectEnd - entry.redirectStart, // 重定向耗时
          ttfb: entry.responseStart, // 首字节时间
          protocol: entry.nextHopProtocol, // 请求协议
          resourceSize: entry.decodedBodySize, // 资源解压后的大小
          isCache:
            entry.transferSize === 0 ||
            (entry.transferSize !== 0 && entry.encodedBodySize === 0), // 是否命中缓存
          bodySize: entry.transferSize, // 资源大小
          headerSize: entry.transferSize - entry.encodedBodySize, // 资源头部大小
        };
        lazyReport("/resource-indicator", resourceIndicator);
        console.log('资源指标', resourceIndicator);
        observer.disconnect();
      }
    }
  };
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: "resource", buffered: true });
}
