import { mechanismType } from "../type";
export declare function getErrorKey(event: ErrorEvent | Event): mechanismType.JS | mechanismType.RS | mechanismType.CS;
export declare function getLastEvent(): Event;
export declare function getSelector(pathsOrTarget: any): any;
export declare function nowTime(data: {
    hms?: boolean;
    time?: number;
}): number | string;
export declare function isLoad(callback: any): void;
