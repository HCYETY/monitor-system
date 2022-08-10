// import { autoTrackerReport } from './actionTracker';
// import { hashPageTrackerReport, historyPageTrackerReport } from './pageTracker';
import { errorCatch } from './errorTrack';
import {initOptions} from "../type";

/**
 * 加载配置
 * @param {*} options
 */
export function loadConfig(options: initOptions) {
    const {
        appId,  // 系统id
        userId, // 用户id
        reportUrl, // 后端url
        autoTracker, // 自动埋点
        delay, // 延迟和合并上报的功能
        hashPage, // 是否hash录有
        errorReport // 是否开启错误监控
    } = options;

    // --------- appId ----------------
    // if (appId) {
    //     window['_monitor_app_id_'] = appId;
    // }
    //
    // // --------- userId ----------------
    // if (userId) {
    //     window['_monitor_user_id_'] = userId;
    // }
    //
    // // --------- 服务端地址 ----------------
    // if (reportUrl) {
    //     window['_monitor_report_url_'] = reportUrl;
    // }
    //
    // // -------- 合并上报的间隔 ------------
    // if (delay) {
    //     window['_monitor_delay_'] = delay;
    // }
    //
    // --------- 是否开启错误监控 ------------
    if (errorReport) {
        errorCatch();
    }
    //
    // // --------- 是否开启无痕埋点 ----------
    // if (autoTracker) {
    //     autoTrackerReport();
    // }
    //
    // // ----------- 路由监听 --------------
    // if (hashPage) {
    //     hashPageTrackerReport(); // hash路由上报
    // } else {
    //     historyPageTrackerReport(); // history路由上报
    // }
}
