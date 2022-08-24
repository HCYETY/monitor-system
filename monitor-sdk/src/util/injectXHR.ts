import { httpMetrics } from "@/type";

// 调用 proxyXmlHttp 即可完成全局监听 XMLHttpRequest
export const proxyXmlHttp = (sendHandler: Function | null | undefined, loadHandler: Function) => {
  if (isExistsXMLHttpRequest()) {

    const _XMLHttpRequest = getNewXMLHttpRequest();

    (window as any).XMLHttpRequest = function () {
      const xhr = new _XMLHttpRequest();
      const { open, send } = xhr;
      let metrics = initMetrics();

      // 是否超时
      let isTimeout = false;

      xhr.addEventListener('timeout', () => {
        isTimeout = true
      })

      xhr.addEventListener('loadend', () => {
        const { status, statusText, response } = xhr;

        if (isTimeout) {
          setMetrics(406, 'timeout', 'Request timeout', new Date().getTime());
        } else {
          // 异常情况
          if (status >= 400) {
            // 网络异常
            setMetrics(status, statusText, 'Request failed with status code ' + status, new Date().getTime(), response);
          } else if (status >= 200 && status < 300) {
            // success
            setMetrics(status, statusText, 'Request success', new Date().getTime(), response);
          }
        }

        metrics.duration = metrics.responseTime - metrics.requestTime

        if (typeof loadHandler === 'function') loadHandler(metrics);
        // xhr.status 状态码
        console.log('xhr', metrics);

        function setMetrics(status: number, statusText: string, message: string, responseTime: number, response?: Date) {
          metrics = {
            ...metrics,
            status,
            statusText,
            message,
            responseTime,
          };
          if (response) {
            metrics.response = response;
          }
        }
      });

      return xhr;

      function initMetrics() {
        let metrics = {} as httpMetrics;
        xhr.open = (method: string, url: string) => {
          metrics.method = method.toUpperCase();
          metrics.url = url;
          open.call(xhr, method, url, true);
        };
        xhr.send = (body) => {
          metrics.body = body || '';
          metrics.requestTime = new Date().getTime();
          if (typeof sendHandler === 'function')
            sendHandler(xhr);
          send.call(xhr, body);
        };
        return metrics;
      }
    };
  }

  function getNewXMLHttpRequest() {
    const _XMLHttpRequest = window.XMLHttpRequest;
    if (!(window as any)._XMLHttpRequest) {
      (window as any)._XMLHttpRequest = _XMLHttpRequest;
    }
    return _XMLHttpRequest;
  }

  function isExistsXMLHttpRequest() {
    return 'XMLHttpRequest' in window && typeof window.XMLHttpRequest === 'function';
  }
};