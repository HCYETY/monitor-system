import { IResult } from "ua-parser-js";
export interface initOptions {
    appId: string;
    userId: string;
    reportUrl: string;
    delay: number;
    autoTracker: boolean;
    hashPage: boolean;
    errorReport: boolean;
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
    userAgent: string | IResult;
    winScreen: string;
    docScreen: string;
}
export declare enum mechanismType {
    JS = "js",
    RS = "resource",
    UJ = "unhandledrejection",
    HP = "http",
    CS = "cors",
    VUE = "vue"
}
export declare enum metricsName {
    PI = "page-information",
    OI = "origin-information",
    RCR = "router-change-record",
    CBR = "click-behavior-record",
    CDR = "custom-define-record",
    HT = "http-record"
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
