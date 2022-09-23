import { proxyFetch } from "@/common/injectFetch";
import { proxyXmlHttp } from "@/common/injectXHR";
import { AxiosError } from "axios";
import { createCorsError, createJsError, createPromiseError, createResourceError, getErrorKey, getLastEvent, getSelector } from ".";
import { httpMetrics, mechanismType } from "../type";
import { lazyReport } from "@/common/report";

// -------- initHttpHandler (XHR And Fetch)----------------
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

// --------  js error / resource error / script error ---------
export const handleJs = function (event: any): void {
  event.preventDefault();

  // 用户最后一个交互事件
  const lastEvent: Event = getLastEvent();

  // 判断是否跨域
  const type = getErrorKey(event);

  if (type === mechanismType.RS) {
    const { src, outerHTML, tagName } = event.target;

    const resourceError = createResourceError(event, src, outerHTML, tagName);
    console.log('resourceError log数据', resourceError);
    lazyReport('/resource', resourceError);
  } else if (type === mechanismType.JS) {

    const { message, type, filename, lineno, colno } = event;
    const selector = lastEvent ? getSelector((lastEvent as any).path!) : '';

    const jsError = createJsError(message, type, filename, lineno, colno, selector);
    console.log('jsError log数据', jsError);
    lazyReport('/js', jsError);
  } else if (type === mechanismType.CS) {
    let { url, method, params, data } = event.config;
    const { name, message, response, request } = event;

    const corsErrorData = createCorsError(name, message, url, method, response, request, params, data)
    console.log('CORSError log数据', corsErrorData)
  }
}
// ------  promise error  --------
export const handlePromise = function (event: any): void {
  // const isCors = event.reason instanceof AxiosError;
  const isCors = event?.reason?.name === 'AxiosError';
  if (!isCors) {
    // 用户最后一个交互事件
    const lastEvent: Event = getLastEvent();
    // let stack: string = '';
    let message: string = '';
    let filename: string = '';
    let line: number = 0;
    let column: number = 0;
    let reason = event.reason;

    if (typeof reason === 'string') {
      message = reason;
    } else if (typeof reason === 'object') {
      if (reason.stack) {
        let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
        filename = matchResult[1];
        line = matchResult[2];
        column = matchResult[3];
      }
      message = reason.message;
    }
    const selector = lastEvent ? getSelector((lastEvent as any).path) : '';
    const promiseErrorData = createPromiseError(message, event, filename, line, column, selector);
    console.log('promise log数据', promiseErrorData);
    lazyReport('promise', promiseErrorData);
  } else {
    const { config, name, message, response, request } = event.reason;
    let { url, method, params, data } = config;
    const corsErrorData = createCorsError(name, message, url, method, response, request, params, data);
    console.log('CORSError log数据', corsErrorData);
    lazyReport('/cors', corsErrorData);
  }
}
