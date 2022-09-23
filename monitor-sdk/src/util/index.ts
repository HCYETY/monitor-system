import { httpMetrics, mechanismType } from '../type';
import { AxiosError } from 'axios';
import { ResourceError } from './ResourceError';
import { CorsError } from './CorsError';
import { JsError } from './JsError';
import { PromiseError } from './PromiseError';
import sourceMap, {SourceMapGenerator} from 'source-map';

// 判断是 JS异常、静态资源异常、还是跨域异常
export function getErrorKey(event: ErrorEvent | Event) {
    // const isJsError = event instanceof ErrorEvent;
    // if (!isJsError) return mechanismType.RS;

    // 有 e.target.src(href) 的认定为资源加载错误
    const target = event.target;
    // const isElementTarget: boolean = target && (target.src || target.href);
    const isElementTarget: boolean = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;
    if (isElementTarget) {
        return mechanismType.RS;
    }
    if (event instanceof AxiosError) {
        return mechanismType.CS;
    }
    // return event.message === 'Script error.' ? mechanismType.CS : mechanismType.JS;
    return mechanismType.JS;
};

// 获取用户最后一个交互事件
export function getLastEvent() {
    let lastEvent: Event;
    [
        'click',
        'mousedown',
        // 'mouseover',
        'keydown',
        'touchstart',
    ].forEach(eventType => {
        window.addEventListener(
          eventType,
          (event) => {
            lastEvent = event;
          },
          {
              capture: true,
              passive: true // 默认不阻止默认事件
          }
      );
    })
    return lastEvent;
}

// 获取选择器
export function getSelector(pathsOrTarget: any) {
  console.log('params', pathsOrTarget)

  const handleSelector = function (pathArr: any) {
    return pathArr
      .reverse()
      .filter((element: any) => {
        // 去除 document 和 window
        return element !== document && element !== window;
      })
      .map((element: any) => {
        const { id, className, tagName } = element;
        if (id) {
          return `${tagName.toLowerCase()}#${id}`;
        } else if (className && typeof className === 'string') {
          return `${tagName.toLowerCase()}.${className}`;
        } else {
          return tagName.toLowerCase();
        }
      })
      .join(' ');
  }

    if (Array.isArray(pathsOrTarget)) {
        return handleSelector(pathsOrTarget);
    } else {
        let pathArr = [];
        while (pathsOrTarget) {
            pathArr.push(pathsOrTarget);
            pathsOrTarget = pathsOrTarget.parentNode;
        }
        return handleSelector(pathArr);
    }
}

// 获取当前时间戳：hh:mm:ss 格式 或者 毫秒格式
// 参数为 data.hms === true 是 hh:mm:ss 格式，否则为毫秒格式
// 可以参数 data.time 创建 Date 对象
export function nowTime(data: { hms?: boolean, time?: number }): number | string {
    const { hms, time } = data;
    if (hms === true) {
        const newTime = time ? new Date(time) : new Date();
        const hour = newTime.getHours();
        const minute = newTime.getMinutes();
        const second = newTime.getSeconds();
        const timer = hour + ':' + minute + ':' + second + ' ';
        return timer;
    }
    return new Date().getTime();
}

// 判断白屏的时机
export function isLoad(callback) {
    if (document.readyState === 'complete') {
        callback();
    } else {
        window.addEventListener('load', callback);
    }
}

// 根据行数获取源文件行数 todo
export async function getPosition (map, lineno, colno) {
    const consumer = await new sourceMap.SourceMapConsumer(map);

    const position = consumer.originalPositionFor({
        line: lineno,
        column: colno
    })

    // position.content = consumer.sourceContentFor(position.source)

    return position;
}

// 计算用时
export function calcDuration(metrics: httpMetrics) {
    metrics.duration = metrics.responseTime - metrics.requestTime;
}
export function createResourceError(event: any, src: any, outerHTML: any, tagName: any) {
    return new ResourceError(
        event.type,
        src,
        `GET ${src} net::ERR_CONNECTION_REFUSED`,
        outerHTML,
        mechanismType.RS,
        tagName,
        getSelector(event.path)
    );
}

export function createCorsError(
  name: string,
  message: string,
  url: string,
  method: string,
  response: any,
  request: any,
  params: any,
  data: any
) {
  return new CorsError(
    mechanismType.CS,
    name,
    message,
    url,
    method,
    response.status,
    response ? JSON.stringify(response) : '',
    request ? JSON.stringify(request) : '',
    { query: params, body: data }
  )
}

export function createJsError(
  message: any,
  type: any,
  filename: any,
  lineno: any,
  colno: any,
  selector: any
) {
  // todo sourceMap
  const obj = getPosition('monitor.cjs.js.map', lineno, colno);
  console.log('obj', obj);

  return new JsError(
    message,
    type,
    mechanismType.JS,
    filename,
    `${lineno}:${colno}`,
    selector
  );
}

export function createPromiseError(
  message: string,
  event: any,
  filename: string,
  line: number,
  column: number,
  selector: any
) {
  return new PromiseError(
    message,
    event.type,
    mechanismType.UJ,
    filename,
    `${line}:${column}`,
    selector
  )
}
