import { mechanismType } from "../type";
import { getErrorKey, getLastEvent, getSelector } from "../util";

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

    // --------  js error / resource error ---------
    const handleJs = function (event: any) {
        event.preventDefault();
        // 如果不是跨域脚本异常,就结束
        if (getErrorKey(event) === mechanismType.CS) return;

        // 用户最后一个交互事件
        const lastEvent = getLastEvent();
        let log = null;

        const target = event.target;
        let isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;
        if (isElementTarget) {
        // 有 e.target.src(href) 的认定为资源加载错误
        // if (event.target && (event.target.src || event.target.href)) {
            log = {
                type: event.type,
                url: target.src,
                message: `GET ${target.src} net::ERR_CONNECTION_REFUSED`, // TODO
                html: target.outerHTML,
                errorType: 'resourceError',
                tagName: target.tagName,
                selector: getSelector(event.path),
            }
        } else {
            log = {
                message: event.message, // 报错信息
                type: event.type,
                errorType: 'jsError',
                fileName: event.filename,
                position: `${event.lineno}:${event.colno}`,
                // stack: getLines(event.error.stack), //错误堆栈
                selector: lastEvent ? getSelector((lastEvent as any).path) : '',
            }
        }
        console.log('injectJsError log数据', log)
    }

    // ------  promise error  --------
    const handlePromise = function (event: any) {
        // 用户最后一个交互事件
        const lastEvent = getLastEvent();
        let message;
        let filename;
        let line = 0;
        let column = 0;
        let stack = '';
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
            errorType: 'promiseError',
            fileName: filename,
            position: `${line}:${column}`,
            selector: lastEvent ? getSelector((lastEvent as any).path) : '',
        }
        console.log('promise log数据', log)
    }

    // ------  console.error  --------
    let consoleError = window.console.error;
    window.console.error = function (error) {
        if (error != '参数有缺失') {
            const message = error.message;
            const stack = error.stack;
            const url = window.location.href;
            let row = 0, column = 0;
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



    // // 捕获接口异常
    // const orignalEvents = [
    //     'abort',
    //     'error',
    //     'load',
    //     'timeout',
    //     'onreadystatechange',
    // ]
    // const method = 'open'
    // const originalXhrProto = window.XMLHttpRequest.prototype
    // const original = originalXhrProto[method]
    // originalXhrProto.open = function (...args) {
    //     console.log(args);

    //     // 获取xhr实例  绑定事件
    //     const xhr = this
    //     orignalEvents.forEach((eType) => {
    //         xhr.addEventListener(eType, function (e: any) {
    //             // ...
    //             interfaceError(e)
    //         })
    //     })
    //     original.apply(this, args as any)
    // }
    // function interfaceError(error: any) {
    //     // console.log('接口异常', error)
    //     let { url, method, params, data } = error.config;
    //     const { language, userAgent } = navigator;
    //     let err_data = {
    //         url: error.request.responseURL,
    //         // timestamp,
    //         language,
    //         userAgent, //浏览器版本
    //         method,
    //         type: 'xhr',
    //         eventType: "load", //事件类型 TODO
    //         // pathname: url, //路径
    //         status: error.status,
    //         // duration:
    //         response: error.response ? JSON.stringify(error.response) : "",
    //         params: { query: params, body: data },
    //         error: error.data?.message || error.statusText,
    //         // error: error.data?.message || JSON.stringify(error.data),
    //     }
    //     // console.log('接口异常 log数据', err_data)
    // }
}