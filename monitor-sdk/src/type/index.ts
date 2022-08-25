export interface initOptions {
    appId?: string;  // 系统id
    cookie: string; // 用户id
    reportUrl: string; // 后端url
    delay?: number; // 延迟和合并上报的功能
    autoTracker?: boolean; // 自动埋点
    hashPage: boolean; // 是否hash录有
    errorReport: boolean;// 是否开启错误监控
    performanceReport: boolean // 是否开启性能监控
}

// 网页 userAgent 信息
export interface userAgent {
    browserName: string,
    browserVersion: string,
    osName: string,
    osVersion: string,
    deviceType: string,
    deviceVendor: string,
    deviceModel: string,
    engineName: string,
    engineVersion: string,
    cpuArchitecture: string,
    ua: string,
}

// 网页及浏览器信息
export interface PageInformation {
    host: string;
    hostname: string;
    href: string;
    protocol: string;
    origin: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
    // 网页标题
    title: string;
    // 浏览器的语种 (eg:zh) ; 这里截取前两位，有需要也可以不截取
    language: string;
    // 用户 userAgent 信息
    userAgent: userAgent;
    // 屏幕宽高 (eg:1920x1080)  屏幕宽高意为整个显示屏的宽高
    winScreen: string;
    // 文档宽高 (eg:1388x937)   文档宽高意为当前页面显示的实际宽高（有的同学喜欢半屏显示）
    docScreen: string;
}

// 页面性能数据
export interface performanceType {
    redirect: number,
    appCache: number,
    DNS: number,
    TCP: number,
    SSL: number,
    request: number,
    response: number,
    Trans: number,
    DOM: number,
    FirstByte: number,
    processing: number,
    Load: number,
    Res: number,
    DomReady: number,
    domParse: number,
    TTFB: number,
    FP: number,
    TTI: number,
}

// 上报的路由信息
export interface routeType {
    beforeUrl: string, // 用户来路地址
    currentUrl: string, // 路由跳转地址
    type: string, // 用户来路方式
    startTime: number,
    duration: number,
    endTime: number,
}

// 错误类型
export enum mechanismType {
    JS = 'jsError',
    RS = 'resourceError',
    UJ = 'unhandledrejectionError',
    HP = 'httpError',
    CS = 'corsError',
    VUE = 'vueError',
}

// 用户行为所做的参数
export enum metricsName {
    PI = 'page-information',
    OI = 'origin-information',
    RCR = 'router-change-record',
    CBR = 'click-behavior-record',
    CDR = 'custom-define-record',
    HT = 'http-record',
}

export interface httpMetrics {
    method: string;
    url: string | URL;
    body: Document | XMLHttpRequestBodyInit | null | undefined | ReadableStream;
    requestTime: number;
    responseTime?: number;
    status?: number;
    statusText?: string;
    response?: any;
    type?: string,
    timeStamp?: string,
    message?: string,
    duration?: number
}


// 白屏初始化
export type BlackScreenDataType = {
    wrapperElements: string[];
    emptyPoints: number;
};