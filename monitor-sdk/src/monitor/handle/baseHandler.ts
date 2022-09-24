// import { proxyFetch } from "@/monitor/injectFetch";
// import { proxyXmlHttp } from "@/monitor/injectXHR";
import { AxiosError } from "axios";
import {
  calcDuration,
  createCorsError,
  createJsError,
  createPromiseError,
  createResourceError,
  getErrorKey,
  getLastEvent,
  getSelector,
  isLoad
} from "@util/index";
import { BlackScreenDataType as initData, httpMetrics, mechanismType } from "../../type/index";
import { lazyReport } from "@monitor/report/index";
import { ConsoleError } from "@monitor/class/ConsoleError";

// --------  Error error / resource error / script error ---------
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
    lazyReport('/resource-error', resourceError);
  } else if (type === mechanismType.JS) {

    const { message, type, filename, lineno, colno } = event;
    const selector = lastEvent ? getSelector((lastEvent as any).path!) : '';

    const jsError = createJsError(message, type, filename, lineno, colno, selector);
    console.log('jsError log数据dddddd', jsError);
    lazyReport('/js-error', jsError);
  } else if (type === mechanismType.CS) {
    let { url, method, params, data } = event.config;
    const { name, message, response, request } = event;

    const corsErrorData = createCorsError(name, message, url, method, response, request, params, data)
    console.log('CORSError log数据', corsErrorData)
    lazyReport('/cors-error', corsErrorData);
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
    lazyReport('/promise-error', promiseErrorData);
  } else {
    const { config, name, message, response, request } = event.reason;
    let { url, method, params, data } = config;
    const corsErrorData = createCorsError(name, message, url, method, response, request, params, data);
    console.log('CORSError log数据', corsErrorData);
    lazyReport('/cors-error', corsErrorData);
  }
}
// ------  console.error  --------
export const injectConsole = () => {
  // ------  console.error  --------
  let consoleError = window.console.error;
  window.console.error = function (error) {
    if (error != '参数有缺失') {
      const { message, stack } = error;
      let column: number = 0;
      let row: number = 0;
      let url = window.location.href;

      const consoleErrorData = createConsoleError(message, column, row, stack, url);

      if (stack) {
        let mres = stack.match(/\(.*?\)/g) || [];
        let firstLine = (mres[0] || '').replace('(', '').replace(')', '') // 获取到堆栈信息的第一条

        // 根据:分隔获取行列
        let info = firstLine.split(':');
        row = +info[info.length - 2]; // 行
        column = +info[info.length - 1]; // 列
      }

      // setTimeout(function () {
      // 上报错误内容
      consoleErrorData.row = row;
      consoleErrorData.column = column;
      // let opt = {
      //   url,
      //   row,
      //   column,
      //   message,
      //   stack, // 错误堆栈信息
      // }
      console.log('error捕获', consoleErrorData);
      lazyReport('/console-error', consoleErrorData);
      // }, 0);
    }

    return consoleError.apply(console, arguments as any);

    function createConsoleError(
      message: any,
      column: number,
      row: number,
      stack: any,
      url: string
    ) {
      return new ConsoleError(message, column, row, stack, url);
    }
  }
}

// 调用 proxyFetch 即可完成全局监听 fetch
const proxyFetch = (sendHandler: Function | null | undefined, loadHandler: Function) => {
  if (isExistsFetch()) {
    const _Fetch = getNewFetch()

    ;(window as any).fetch = async (input: any, init: RequestInit) => {
      // init 是用户手动传入的 fetch 请求互数据，包括了 method、body、headers，要做统一拦截数据修改，直接改init即可

      if (typeof sendHandler === 'function') {
        sendHandler(init)
      }
      let metrics = {} as httpMetrics

      initMetrics()

      return _Fetch
        .call(window, input, init)
        .then(async response => {
          // clone 出一个新的 response,再用其做.text(),避免 body stream already read 问题
          const { status, statusText, url } = response
          let message: string

          setMessageByStatus()

          const res = response.clone()
          await setMetrics()

          if (typeof loadHandler === 'function') {
            loadHandler(metrics)
          }

          console.log('fetch then', metrics)

          return metrics

          function setMessageByStatus() {
            if (status >= 200 && status < 300) {
              // 正常情况
              message = 'success'
            } else if (status === 404) {
              // Not Found
              message = 'Request failed with status code 404'
            } else if (status === 500) {
              // Internal Server Error
              message = 'Request failed with status code 500'
            }
          }

          async function setMetrics() {
            metrics = {
              ...metrics,
              message,
              status,
              statusText,
              response: await res.text(),
              responseTime: new Date().getTime(),
              url,
            }
            calcDuration(metrics)
          }
        })
        .catch(async e => {
          const { message } = e

          setErrorMetrics()

          console.log('fetch error', metrics)

          return metrics

          function setErrorMetrics() {
            metrics = {
              ...metrics,
              message,
              status: 0,
              statusText: 'error',
              responseTime: new Date().getTime(),
            }
            calcDuration(metrics)
          }
        })

      function initMetrics() {
        metrics = {
          method: init?.method.toUpperCase() || '',
          url: (input && typeof input !== 'string' ? input?.url : input) || '',
          body: init?.body || '',
          requestTime: new Date().getTime(),
        }
      }
    }
  }

  function getNewFetch() {
    const _Fetch = window.fetch
    if (!(window as any)._Fetch) {
      ;(window as any)._Fetch = _Fetch
    }
    return _Fetch
  }

  function isExistsFetch() {
    return 'fetch' in window && typeof window.fetch === 'function'
  }
}
// 调用 proxyXmlHttp 即可完成全局监听 XMLHttpRequest
const proxyXmlHttp = (sendHandler: Function | null | undefined, loadHandler: Function) => {
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
        lazyReport('/interface-error', metrics);

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

export const blankScreen = (): void => {
  console.log('%c%s', 'font-size: 24px; color: orange', '开始监控网页是否白屏');

  // 屏幕上空白点的数量
  let { wrapperElements, emptyPoints }: initData = initElementsAndPoints();
  const getSelector = function (element) {
    const { id, className, nodeName } = element;

    if (id) {
      return `#${id}`;
    } else if (className && typeof className === 'string') {
      return concatClassName();
    } else
      return nodeName ? nodeName.toLowerCase() : element;

    function concatClassName() {
      return `.${className.split(' ').filter(item => !!item).join('.')}`;
    }
  }

  const isWrapper = function (element): void {
    let selector = getSelector(element);
    if (wrapperElements.indexOf(selector) !== -1) {
      emptyPoints++;
    }
  }

  const judge = function (): void {
    const { innerWidth, innerHeight } = window;
    findElements();

    if (emptyPoints >= 18) {
      const centerElements: Element[] = document.elementsFromPoint(innerWidth / 2, innerHeight / 2);
      const log = {
        type: "error",
        errorType: "blank",
        emptyPoints,
        screen: screen.width + "x" + screen.height,
        viewPoint: innerWidth + "x" + innerHeight,
        selector: getSelector(centerElements[0]),
      }
      console.log('%c%s', 'color: orange', 'log', log);
      // 上报
      lazyReport('/blank-screen-error', log);
    } else {
      console.log('%c%s', 'color: orange', '白屏监控之空白点数量：', emptyPoints);
    }

    function findElements() {
      for (let i = 1; i <= 9; i++) {
        const xElements: Element[] = document.elementsFromPoint(innerWidth * i / 10, innerHeight / 2);
        const yElements: Element[] = document.elementsFromPoint(innerWidth / 2, innerHeight * i / 10);

        isWrapper(xElements);
        isWrapper(yElements);
      }
    }
  }

  isLoad(judge);

  function initElementsAndPoints() {
    const wrapperElements: string[] = ['html', 'body', '#container', '.content.main'];
    let emptyPoints: number = 0; // 屏幕上空白点的数量
    return { wrapperElements, emptyPoints };
  }
}
