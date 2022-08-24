// 监听页面
import {routeType} from "../type";
import {lazyReport} from "../common/report";

// 重写 pushState 和 replaceState 方法
const createHistoryEvent = function (name) {
    // 拿到原来的处理方法
    const origin = window.history[name];

    return function (event) {
        if (name === 'replaceState') {
            const { current } = event;
            const pathName = location.pathname;
            if (current === pathName) {
                let res = origin.apply(this, arguments);
                return res;
            }
        }

        let res = origin.apply(this, arguments);
        let e = new Event(name);
        // @ts-ignore
        e.arguments = arguments;
        window.dispatchEvent(e);
        return res;
    };
};

/**
 * history路由监听
 */
export function historyPageTrack (): void {
    console.log('%c%s', 'font-size: 24px; color: skyblue', '开始监控 history 路由跳转');

    let beforeTime = Date.now(); // 进入页面的时间
    let beforeUrl: string = ''; // 上一个页面

    // 获取在某个页面的停留时间
    function getDuration(): { curTime: number, duration: number } {
        let curTime = Date.now();
        let duration = curTime - beforeTime;
        beforeTime = curTime;
        return { curTime, duration };
    }

    window.history.pushState = createHistoryEvent('pushState');
    window.history.replaceState = createHistoryEvent('replaceState');

    // 记录当前页面信息，并更新上一个页面的 endTime
    const recordBehaviors = () => {
        console.log('%c%s%s', 'color: skyblue', 'history路由跳转beforeUrl', beforeUrl);
        // let routeList: routeType[] = [];
        const currentUrl = window.location.href;
        let time = Date.now();
        // let behaviors = localStorage.getItem('current_behavior');
        const typeNum = window.performance?.navigation.type;
        let type = '';
        switch (typeNum) {
            case 0:
                type = '点击链接、地址栏输入、表单提交、脚本操作等';
                break;
            case 1:
                type = '点击重新加载按钮、location.reload';
                break;
            case 2:
                type = '点击前进或后退按钮';
                break;
            case 3:
                type = '任何其他来源。即非刷新/非前进后退、非点击链接/地址栏输入/表单提交/脚本操作等';
                break;
        }
        const routeTemplate: routeType = {
            beforeUrl,
            currentUrl,
            type,
            startTime: time,
            duration: getDuration().duration,
            endTime: getDuration().curTime,
        }
        beforeUrl = currentUrl;
        // if (behaviors) {
        //     routeList = JSON.parse(behaviors);
        //     const len = routeList.length;
        //     if (len > 0) {
        //         routeList[len - 1].endTime = time;
        //         routeList[len - 1].duration = time - routeList[len - 1].startTime;
        //     }
        // }
        // routeList.push(routeTemplate);
        console.log('%c%s%o', 'color: skyblue', 'routeTemplate', routeTemplate);
        lazyReport('/history', routeTemplate);
        // localStorage.setItem('current_behavior', JSON.stringify(routeList));
    }

    [
        // history.go()、history.back()、history.forward() 监听
        'popstate',
        // history.pushState() 监听
        'pushState',
        // history.replaceState() 监听
        'replaceState',
        // 页面 load 监听
        'load',
        // 页面 beforeunload 监听
        'beforeunload'
    ].map((type: string) => {
        window.addEventListener(type, function () {
            if (type === 'beforeunload') {
                // 上报
            }
            recordBehaviors();
        })
    });
}


/**
 * hash路由监听
 */
export function hashPageTrack (): void {
    console.log('%c%s', 'font-size: 24px; color: skyblue', '开始监控 hash 路由跳转');

    let beforeTime: number = Date.now(); // 进入页面的时间
    let beforeUrl: string = ''; // 上一个页面

    // 获取在某个页面的停留时间
    function getDuration(): { curTime: number, duration: number } {
        let curTime: number = Date.now();
        let duration: number = curTime - beforeTime;
        beforeTime = curTime;
        return { curTime, duration };
    }

    // 记录当前页面信息，并更新上一个页面的 endTime
    const recordBehaviors = function (): void {
        const currentUrl: string = window.location.href;
        let time: number = Date.now();
        const typeNum: number = window.performance?.navigation.type;
        let type: string = '';
        switch (typeNum) {
            case 0:
                type = '点击链接、地址栏输入、表单提交、脚本操作等';
                break;
            case 1:
                type = '点击重新加载按钮、location.reload';
                break;
            case 2:
                type = '点击前进或后退按钮';
                break;
            case 3:
                type = '任何其他来源。即非刷新/非前进后退、非点击链接/地址栏输入/表单提交/脚本操作等';
                break;
        }
        const routeTemplate: routeType = {
            beforeUrl,
            currentUrl,
            type,
            startTime: time,
            duration: getDuration().duration,
            endTime: getDuration().curTime,
        }
        beforeUrl = currentUrl;
        lazyReport('/hash', routeTemplate);
        console.log('%c%s%o', 'color: skyblue', 'routeTemplate', routeTemplate);
    }

    window.history.pushState = createHistoryEvent('pushState');

    [
        // history.hash() 监听
        'hashchange',
        // history.pushState() 监听
        'pushState',
        // 页面 load 监听
        'load',
        // 页面 beforeunload 监听
        'beforeunload'
    ].map((type: string) => {
        window.addEventListener(type, function () {
            recordBehaviors();
        })
    });
}