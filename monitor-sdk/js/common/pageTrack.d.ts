import { PageInformation } from "../type";
import parser from 'ua-parser-js';
export declare function getUserAgent(): parser.IResult;
export declare function getPageInfo(): PageInformation;
export declare function getPerformanceTiming(): void;
export declare const getPv: () => void;
