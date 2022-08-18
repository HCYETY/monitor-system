import { initHttpHandler } from "../util/baseHandler";
import { mechanismType } from "../type";
import { getErrorKey, getLastEvent, getSelector } from "../util";
import { AxiosError } from "axios";

// // --------  js error / resource error / script error ---------
// export const handleJs = function (event: any): void {
//     event.preventDefault();
//
//     // 用户最后一个交互事件
//     const lastEvent: Event = getLastEvent();
//     let log = null;
//
//     // 判断是否跨域
//     const type = getErrorKey(event);
//     console.log('是否跨域', type)
//
//     if (type === mechanismType.RS) {
//         const target = event.target;
//         log = {
//             type: event.type,
//             url: target.src,
//             message: `GET ${target.src} net::ERR_CONNECTION_REFUSED`, // TODO
//             html: target.outerHTML,
//             errorType: mechanismType.RS,
//             tagName: target.tagName,
//             selector: getSelector(event.path),
//         }
//         console.log('resourceError log数据', log)
//     } else if (type === mechanismType.JS) {
//         log = {
//             message: event.message,
//             type: event.type,
//             errorType: mechanismType.JS,
//             fileName: event.filename,
//             position: `${event.lineno}:${event.colno}`,
//             // stack: getLines(event.error.stack), //错误堆栈
//             selector: lastEvent ? getSelector((lastEvent as any).path) : '',
//         }
//         console.log('jsError log数据', log)
//     } else if (type === mechanismType.CS) {
//         let { url, method, params, data } = event.config;
//         let corsErrorData = {
//             errorType: mechanismType.CS,
//             type: event.name,
//             message: event.message,
//             url,
//             method,
//             status: event.response.status,
//             response: event.response ? JSON.stringify(event.response) : "",
//             request: event.request ? JSON.stringify(event.request) : "",
//             params: { query: params, body: data },
//         }
//         console.log('CORSError log数据', corsErrorData)
//     }
// }

export function errorCatch() {
    console.log('%c%s', 'font-size: 24px; color: red', '开始监控网页报错');

    // 监控 js 错误
    window.addEventListener('error', (event) => {
        handleJs(event);
    }, true)

    // 监控 promise 错误
    window.addEventListener('unhandledrejection', (event) => {
        handlePromise(event);
    }, true)

    // --------  js error / resource error / script error ---------
    const handleJs = function (event: any): void {
        event.preventDefault();

        // 用户最后一个交互事件
        const lastEvent: Event = getLastEvent();
        console.log(lastEvent);

        let log = null;

        // 判断是否跨域
        const type = getErrorKey(event);
        console.log('是否跨域', type)

        if (type === mechanismType.RS) {
            const target = event.target;
            log = {
                type: event.type,
                url: target.src,
                message: `GET ${target.src} net::ERR_CONNECTION_REFUSED`, // TODO
                html: target.outerHTML,
                errorType: mechanismType.RS,
                tagName: target.tagName,
                selector: getSelector(event.path),
            }
            console.log('resourceError log数据', log)
        } else if (type === mechanismType.JS) {
            log = {
                message: event.message,
                type: event.type,
                errorType: mechanismType.JS,
                fileName: event.filename,
                position: `${event.lineno}:${event.colno}`,
                // stack: getLines(event.error.stack), //错误堆栈
                selector: lastEvent ? getSelector((lastEvent as any).path) : '',
            }
            console.log('jsError log数据', log)
        } else if (type === mechanismType.CS) {
            let { url, method, params, data } = event.config;
            let corsErrorData = {
                errorType: mechanismType.CS,
                type: event.name,
                message: event.message,
                url,
                method,
                status: event.response.status,
                response: event.response ? JSON.stringify(event.response) : "",
                request: event.request ? JSON.stringify(event.request) : "",
                params: { query: params, body: data },
            }
            console.log('CORSError log数据', corsErrorData)
        }
    }

    // ------  promise error  --------
    const handlePromise = function (event: any): void {
        const isCors = event.reason instanceof AxiosError;
        if (!isCors) {
            // 用户最后一个交互事件
            const lastEvent: Event = getLastEvent();
            let message: string = '';
            let filename: string = '';
            let line: number = 0;
            let column: number = 0;
            let stack: string = '';
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
            const log = {
                message, // 报错信息
                type: event.type,
                errorType: mechanismType.UJ,
                fileName: filename,
                position: `${line}:${column}`,
                selector: lastEvent ? getSelector((lastEvent as any).path) : '',
            }
            console.log('promise log数据', log)
        } else {
            const error = event.reason;
            console.log(error)
            let { url, method, params, data } = error.config;
            let corsErrorData = {
                errorType: mechanismType.CS,
                type: error.name,
                message: error.message,
                url,
                method,
                status: error.response.status,
                response: error.response || "",
                request: error.request || "",
                params: { query: params, body: data },
            }
            console.log('CORSError log数据', corsErrorData)
        }
    }

    // ------  console.error  --------
    let consoleError = window.console.error;
    window.console.error = function (error) {
        if (error != '参数有缺失') {
            const message: string = error.message;
            const stack = error.stack;
            const url: string = window.location.href;
            let row: number = 0, column: number = 0;
            if (stack) {
                let mres = stack.match(/\(.*?\)/g) || [];
                let firstLine = (mres[0] || "").replace("(", "").replace(")", ""); // 获取到堆栈信息的第一条

                // 根据:分隔获取行列
                let info = firstLine.split(':')
                row = info[info.length - 2] // 行
                column = info[info.length - 1] // 列
            }

            // setTimeout(function () {
            // 上报错误内容
            let opt = {
                url,
                row,
                column,
                message,
                stack // 错误堆栈信息
            }
            console.log('error捕获', opt);
            // }, 0);
        }
        // console.log(arguments);

        return consoleError.apply(console, arguments as any);
    };

    // ------  http  --------
    initHttpHandler()
}