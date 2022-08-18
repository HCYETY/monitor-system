import { mechanismType } from "../type";
import { AxiosError } from "axios";

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
        console.log(eventType);
        window.addEventListener('click', (event) => {
            console.log(event);
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