import { httpMetrics } from "@/type";

// 调用 proxyFetch 即可完成全局监听 fetch
export const proxyFetch = (sendHandler: Function | null | undefined, loadHandler: Function) => {
  if ('fetch' in window && typeof window.fetch === 'function') {
    const oFetch = window.fetch;
    if (!(window as any).oFetch) {
      (window as any).oFetch = oFetch;
    }
    (window as any).fetch = async (input: any, init: RequestInit) => {
      // init 是用户手动传入的 fetch 请求互数据，包括了 method、body、headers，要做统一拦截数据修改，直接改init即可
      if (typeof sendHandler === 'function') sendHandler(init);
      let metrics = {} as httpMetrics;

      metrics.method = init?.method || '';
      metrics.url = (input && typeof input !== 'string' ? input?.url : input) || ''; // 请求的url
      metrics.body = init?.body || '';
      metrics.requestTime = new Date().getTime();

      return oFetch.call(window, input, init).then(async (response) => {
        // clone 出一个新的 response,再用其做.text(),避免 body stream already read 问题
        const res = response.clone();
        metrics = {
          ...metrics,
          status: res.status,
          statusText: res.statusText,
          response: await res.text(),
          responseTime: new Date().getTime(),
        };
        if (typeof loadHandler === 'function') loadHandler(metrics);
        return response;
      });
    };
  }
};