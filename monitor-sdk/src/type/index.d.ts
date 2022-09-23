export interface initOptions {
    appId?: string;
    cookie: string;
    reportUrl: string;
    delay: number;
    autoTracker?: boolean;
    hashPage: boolean;
    errorReport: boolean;
    performanceReport: boolean;
}
export interface userAgent {
    browserName: string;
    browserVersion: string;
    osName: string;
    osVersion: string;
    deviceType: string;
    deviceVendor: string;
    deviceModel: string;
    engineName: string;
    engineVersion: string;
    cpuArchitecture: string;
    ua: string;
}
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
    title: string;
    language: string;
    userAgent: userAgent;
    winScreen: string;
    docScreen: string;
}
export interface performanceType {
    redirect: number;
    appCache: number;
    DNS: number;
    TCP: number;
    SSL: number;
    request: number;
    response: number;
    Trans: number;
    DOM: number;
    FirstByte: number;
    processing: number;
    Load: number;
    Res: number;
    DomReady: number;
    domParse: number;
    TTFB: number;
    FP: number;
    TTI: number;
}
export interface routeType {
    beforeUrl: string;
    currentUrl: string;
    type: string;
    startTime: number;
    duration: number;
    endTime: number;
}
export declare enum mechanismType {
    JS = "jsError",
    RS = "resourceError",
    UJ = "unhandledrejectionError",
    HP = "httpError",
    CS = "corsError",
    VUE = "vueError"
}
export declare enum metricsName {
    PI = "page-information",
    OI = "origin-information",
    RCR = "router-change-record",
    CBR = "click-behavior-record",
    CDR = "custom-define-record",
    HT = "http-record"
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
    type?: string;
    timeStamp?: string;
    message?: string;
    duration?: number;
}
