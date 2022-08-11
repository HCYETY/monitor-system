export interface initOptions {
    appId: string;  // 系统id
    userId: string; // 用户id
    reportUrl: string; // 后端url
    delay: number; // 延迟和合并上报的功能
    autoTracker: boolean; // 自动埋点
    hashPage: boolean; // 是否hash录有
    errorReport: boolean;// 是否开启错误监控
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

// 错误类型
export enum mechanismType {
    JS = 'js',
    RS = 'resource',
    UJ = 'unhandledrejection',
    HP = 'http',
    CS = 'cors',
    VUE = 'vue',
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

export interface HttpMetrics {
    method: string;
    url: string | URL;
    body: Document | XMLHttpRequestBodyInit | null | undefined | ReadableStream;
    requestTime: number;
    responseTime: number;
    status: number;
    statusText: string;
    response?: any;
}

