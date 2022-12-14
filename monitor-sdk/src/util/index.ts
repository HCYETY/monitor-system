import { AxiosError } from 'axios';
import sourceMap from 'source-map';
import { httpMetrics, mechanismType } from '@type';
import { ResourceError } from '@monitor/class/ResourceError';
import { CorsError } from '@monitor/class/CorsError';
import { JsError } from '@monitor/class/JsError';
import { PromiseError } from '@monitor/class/PromiseError';
import { sourcemap } from '@/sourcemap.js';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

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

// 计算用时
export function calcDuration(metrics: httpMetrics) {
    metrics.duration = metrics.responseTime - metrics.requestTime;
}



const LoadSourceMap = (url) => axios.get(url)

// 根据行数获取源文件行数 todo
export async function getPosition (lineno, colno) {
  // // Get file content
  // const sourceMap = require('source-map');
  // const readFile = function (filePath) {
  //   return new Promise(function (resolve, reject) {
  //     fs.readFile(filePath, {encoding:'utf-8'},
  //       function(error, data) {
  //       if (error) {
  //         console.log(error)
  //         return reject(error);
  //       }
  //       resolve(JSON.parse(data));
  //     });
  //   });
  // };
  // // Find the source location
  // async function searchSource(filePath, line, column) {
  //   const rawSourceMap = await readFile(filePath)
  //   const consumer = await new sourceMap.SourceMapConsumer(rawSourceMap);
  //   const res = consumer.originalPositionFor({ 'line' : line, 'column' : column });
  //   consumer.destroy();
  //   return res;
  // }



  // async function parse(url, lineno, colno) {
  //   const mapObj = JSON.parse(getMapFileContent(url))
  //   const consumer = await new sourceMap.SourceMapConsumer(mapObj)
  //   // 将 webpack://source-map-demo/./src/index.js 文件中的 ./ 去掉
  //   const sources = mapObj.sources.map(item => format(item))
  //   // 根据压缩后的报错信息得出未压缩前的报错行列数和源码文件
  //   const originalInfo = consumer.originalPositionFor({ line: lineno, column: colno })
  //   // sourcesContent 中包含了各个文件的未压缩前的源码，根据文件名找出对应的源码
  //   const originalFileContent = mapObj.sourcesContent[sources.indexOf(originalInfo.source)]
  //   return {
  //     file: originalInfo.source,
  //     content: originalFileContent,
  //     line: originalInfo.line,
  //     column: originalInfo.column,
  //     // msg: error.msg,
  //     // error: error.error
  //   }
  // }
  //
  // function format(item) {
  //   return item.replace(/(\.\/)*/g, '')
  // }
  //
  // function getMapFileContent(url) {
  //   return fs.readFileSync(path.resolve(__dirname, `./maps/${url.split('/').pop()}.map`), 'utf-8')
  // }





  // console.log('@@@@@', sourcemap)
  // var sourceMap = require('source-map');
  // var rawSourceMap = require(sourcemap);
  // sourceMap.SourceMapConsumer.with(rawSourceMap, null, consumer => {
  //   console.log("originalPositionFor: ", "\n", consumer.originalPositionFor({     source: "./",     line: 10,     column: 74647   }));
  // });
  //
  // const sourceData = await LoadSourceMap("monitor.js.map")
  // const fileContent = sourceData.data;
  //
  // const consumer = await new sourceMap.SourceMapConsumer(fileContent);
  //
  // const position = consumer.originalPositionFor({
  //   line: lineno,
  //   column: colno
  // })
  //
  // console.log('@@源文件及错误行和列', position);
  //
  // // if (!position.source) return;
  //
  // // position.content = consumer.sourceContentFor(position.source)
  //
  // const co = consumer.sourceContentFor(position.source);
  // // co 包含了源文件所有的源码
  // const coList = co.split("\n");
  // // 按需取行即可
  // console.log('coList', coList)
  //
  // return position;
}

// 创建 js error 对象
export function createJsError(
  message: any,
  type: any,
  filename: any,
  lineno: any,
  colno: any,
  selector: any
) {
  // todo sourceMap
  const obj = getPosition(lineno, colno);
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

// 创建 resource error 对象
export function createResourceError(event: any, src: string, outerHTML: any, tagName: any) {
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

// 创建 cors error 对象
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

// 创建 promise error 对象
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
