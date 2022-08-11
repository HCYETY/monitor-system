import { httpMetrics, metricsName } from "../type";
import { proxyFetch } from "./injectFetch";
import { proxyXmlHttp } from "./injectXHR";


export const initHttpHandler = (): void => {
  const loadHandler = (metrics: httpMetrics) => {
    if (metrics.status < 400) {
      // 对于正常请求的 HTTP 请求来说,不需要记录 请求体 和 响应体
      delete metrics.response;
      delete metrics.body;
    }
    // 记录到 UserMetricsStore
    // (this as any).metrics.add(metricsName.HT, metrics);
    // 记录到用户行为记录栈
    // (this as any).breadcrumbs.push({
    //   category: metricsName.HT,
    //   data: metrics,
    //   ...(this as any).getExtends(),
    // });
  };
  proxyXmlHttp(null, loadHandler);
  proxyFetch(null, loadHandler);
};


export const timestampToTime = (time: any) => {
  let date = new Date(time)
  let len = time.toString().length;
  let month: string
  let day: string
  let hour: string
  let mintus: number | string
  if (len < 13) {
    let sub = 13 - len;
    sub = Math.pow(10, sub);
    date = new Date(time * sub);
  }
  const year = date.getFullYear() + '年';
  let M: number = date.getMonth() + 1;
  let d: number = date.getDate();
  let h: number = date.getHours();
  let m: number = date.getMinutes();

  month = (M < 10 ? '0' + M : M) + '月';
  day = (d < 10 ? '0' + d : d) + '日';
  hour = (h < 10 ? '0' + h : h) + ':';
  mintus = (m < 10 ? '0' + m : m);
  return year + month + day + hour + mintus;
}