import {mechanismType} from "../type";

// 判断是 JS异常、静态资源异常、还是跨域异常
export function getErrorKey (event: ErrorEvent | Event) {
    const isJsError = event instanceof ErrorEvent;
    if (!isJsError) return mechanismType.RS;
    return event.message === 'Script error.' ? mechanismType.CS : mechanismType.JS;
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
function handleSelector (pathArr: any) {
    return pathArr.reverse().filter((element: any) => {
        // 去除 document 和 window
        return element !== document && element !== window;
    }).map((element: any) => {
        const {id, className, tagName} = element;
        if (id) {
            return `${tagName.toLowerCase()}#${id}`;
        } else if (className && typeof className === 'string') {
            return `${tagName.toLowerCase()}.${className}`;
        } else {
            return tagName.toLowerCase();
        }
    }).join(' ');
}