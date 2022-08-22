# 项目实现
## 技术选型
+ TypeScript
+ Webpack
+ Babel
+ vitest

### 业务分析

使用 原生 js 捕获各种可能发生的错误，并将这些错误中的一些信息提取出来，返回一个仅包含重要信息的 error 对象。

### 场景分析

#### 要解决的问题
将制作并发布的 `sdk` 接入一个项目，并进行测试。

#### 前提假设
按照当前技术选型，预计需要一台服务器。

## 架构设计
在 SDK 这部分的实现中，我们需要将 `js` 的各个错误信息收集起来反馈给服务器，并由服务器发送信息至前端进行信息展示。

## 项目代码介绍

1. xhr 异常

```ts
import { httpMetrics } from "@/type";

// 调用 proxyXmlHttp 即可完成全局监听 XMLHttpRequest

export const proxyXmlHttp = (sendHandler: Function | null | undefined, loadHandler: Function) => {

  if ('XMLHttpRequest' in window && typeof window.XMLHttpRequest === 'function') {

    const _XMLHttpRequest = window.XMLHttpRequest;

    if (!(window as any)._XMLHttpRequest) {

      (window as any)._XMLHttpRequest = _XMLHttpRequest;

    }

    (window as any).XMLHttpRequest = function () {

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

        if (typeof sendHandler === 'function') sendHandler(xhr);

        send.call(xhr, body);

      };

      // 是否超时

      let isTimeout = false;

  

      xhr.addEventListener('timeout', (event) => {

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

    };

  }
};
```
思路
> 通过重写 window 上的 `XMRHttpRequest` 方法，并使用 `addEventListener` 监听器对各种情况进行判断
> 	 timeout => 超时
> 	 
> 	 loadend => 加载结束阶段 

2. Fetch 异常

```ts
export const proxyXmlHttp = (sendHandler: Function | null | undefined, loadHandler: Function) => {

  if ('XMLHttpRequest' in window && typeof window.XMLHttpRequest === 'function') {

    const _XMLHttpRequest = window.XMLHttpRequest;

    if (!(window as any)._XMLHttpRequest) {

      (window as any)._XMLHttpRequest = _XMLHttpRequest;

    }

    (window as any).XMLHttpRequest = function () {

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

        if (typeof sendHandler === 'function') sendHandler(xhr);

        send.call(xhr, body);

      };

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

    };

  }

};
```
思路
> 方法和 `xhr 异常` 同理，也是通过重写 window 上的 fetch 方法，区别在于由于 fetch 的特殊性（**只有网络错误或者无法连接时，Fetch 才会报错**，其他情况下**都不会报错**，而是认为 **请求成功**），因此，我们只能通过
> 1.  `Response.status`  属性，得到 `HTTP` 回应的真实状态码，才能判断请求是否成功
> 2. 或者判断 `response.ok` 是否为 `true`, `true` => 请求成功，否则 **请求失败** 