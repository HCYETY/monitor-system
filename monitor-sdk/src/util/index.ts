import { mechanismType } from "../type";
import { AxiosError } from "axios";
import sourceMap from 'source-map';

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
        window.addEventListener(eventType, (event) => {
            lastEvent = event;
        }, {
            capture: true,
            passive: true // 默认不阻止默认事件
        });
    })
    return lastEvent;
}

// 获取选择器
export function getSelector(pathsOrTarget: any) {
    console.log("params", pathsOrTarget);


    const handleSelector = function (pathArr: any) {
        return pathArr.reverse().filter((element: any) => {
            // 去除 document 和 window
            return element !== document && element !== window;
        }).map((element: any) => {
            const { id, className, tagName } = element;
            if (id) {
                return `${tagName.toLowerCase()}#${id}`;
            } else if (className && typeof className === 'string') {
                return `${tagName.toLowerCase()}.${className}`;
            } else {
                return tagName.toLowerCase();
            }
        }).join(' ');
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

// // 根据行数获取源文件行数
// export async function getPosition (map, rolno, colno) {
//     const consumer = await new sourceMap.SourceMapConsumer(map)
//
//     const position = consumer.originalPositionFor({
//         line: rolno,
//         column: colno
//     })
//
//     position.content = consumer.sourceContentFor(position.source)
//
//     return position
// }

// export async function parse(error) {
//     const mapObj = JSON.parse(getMapFileContent(error.url))
//     const consumer = await new sourceMap.SourceMapConsumer(mapObj)
//     // 将 webpack://source-map-demo/./src/index.js 文件中的 ./ 去掉
//     const sources = mapObj.sources.map(item => format(item))
//     // 根据压缩后的报错信息得出未压缩前的报错行列数和源码文件
//     const originalInfo = consumer.originalPositionFor({ line: error.line, column: error.column })
//     // sourcesContent 中包含了各个文件的未压缩前的源码，根据文件名找出对应的源码
//     const originalFileContent = mapObj.sourcesContent[sources.indexOf(originalInfo.source)]
//     return {
//         file: originalInfo.source,
//         content: originalFileContent,
//         line: originalInfo.line,
//         column: originalInfo.column,
//         msg: error.msg,
//         error: error.error
//     }
// }
//
// function format(item) {
//     return item.replace(/(\.\/)*/g, '')
// }
//
// // function getMapFileContent(url) {
// //     return fs.readFileSync(path.resolve(__dirname, `./maps/${url.split('/').pop()}.map`), 'utf-8')
// // }