import { httpMetrics } from "@/type";
import {handleJs} from "../common/errorTrack";

// 调用 proxyXmlHttp 即可完成全局监听 XMLHttpRequest
export const proxyXmlHttp = (sendHandler: Function | null | undefined, loadHandler: Function) => {
  if ('XMLHttpRequest' in window && typeof window.XMLHttpRequest === 'function') {
    const _XMLHttpRequest = window.XMLHttpRequest;
    if (!(window as any)._XMLHttpRequest) {
      // _XMLHttpRequest 为原生的 XMLHttpRequest，可以用以 SDK 进行数据上报，区分业务
      (window as any)._XMLHttpRequest = _XMLHttpRequest;
    }
    (window as any).XMLHttpRequest = function () {
      // 覆写 window.XMLHttpRequest
      const xhr = new _XMLHttpRequest();
      const { open, send } = xhr;
      let metrics = {} as httpMetrics;
      xhr.open = (method: string, url: string) => {
        metrics.method = method.toUpperCase();
        metrics.url = url;
        open.call(xhr, method, url, true);
      };
      xhr.send = (body) => {
        metrics.body = body || '';
        metrics.requestTime = new Date().getTime();
        // sendHandler 可以在发送 Ajax 请求之前，挂载一些信息，比如 header 请求头
        // setRequestHeader 设置请求header，用来传输关键参数等
        // xhr.setRequestHeader('xxx-id', 'VQVE-QEBQ');
        if (typeof sendHandler === 'function') sendHandler(xhr);
        send.call(xhr, body);
      };
      // 是否超时
      let isTimeout = false;

        // // 捕获接口异常
        // const orignalEvents = [
        //     'abort',
        //     'error',
        //     'load',
        //     'timeout',
        //     'onreadystatechange',
        // ]
      xhr.addEventListener('timeout', (event) => {
        isTimeout = true
      })

      xhr.addEventListener('loadend', () => {
        const { status, statusText, response } = xhr;

        if (isTimeout) {
          metrics = {
            ...metrics,
            status: 406,
            statusText: 'timeout!',
            message: 'Not Acceptable',
            responseTime: new Date().getTime(),
          };
        } else {
          // 异常情况
          if (status >= 400) {
            // 网络异常
            metrics = {
              ...metrics,
              status,
              statusText: 'error',
              message: 'Internet Error',
              responseTime: new Date().getTime(),
            };
          } else if (status >= 200 && status < 300) {
            // success
            metrics = {
              ...metrics,
              status,
              statusText,
              response,
              responseTime: new Date().getTime(),
              message: 'success',
            }
          }
        }

        metrics.duration = metrics.responseTime - metrics.requestTime
        if (typeof loadHandler === 'function') loadHandler(metrics);
        // xhr.status 状态码
        console.log('xhr', metrics);
      });

      // xhr.addEventListener('error', (event) => {
      //   setTimeout(() => {
      //       console.log('捕获到异常：', event);
      //     handleJs(event);
      //   }, 1000);
      // }, true);

      return xhr;
    };
  }
};