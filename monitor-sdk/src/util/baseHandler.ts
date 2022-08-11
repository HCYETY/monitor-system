import { httpMetrics, metricsName } from "../type";
import { proxyFetch } from "./injectFetch";
import { proxyXmlHttp } from "./injectXHR";


export const initHttpHandler = (): void => {
  const loadHandler = (metrics: httpMetrics) => {
    console.log(metrics);
    
    if (metrics.status < 400) {
      // 对于正常请求的 HTTP 请求来说,不需要记录 请求体 和 响应体
      delete metrics.response;
      delete metrics.body;
    }
    // 记录到 UserMetricsStore
    (this as any).metrics.add(metricsName.HT, metrics);
    // 记录到用户行为记录栈
    (this as any).breadcrumbs.push({
      category: metricsName.HT,
      data: metrics,
      ...(this as any).getExtends(),
    });
  };
  proxyXmlHttp(null, loadHandler);
  proxyFetch(null, loadHandler);
};