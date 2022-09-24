import { errorCatch } from '@monitor/handle/errorTrack';
import { initOptions } from "@type/index";
import { hashPageTrack, historyPageTrack } from "@monitor/handle/pageTrack";
import { getPerformance } from "@monitor/handle/performance";
import { blankScreen } from "@monitor/handle/baseHandler";

/**
 * 加载配置
 * @param {*} options
 */
export function loadConfig(options: initOptions): void {
    const {
        appId,  // 系统id
        cookie, // 用户id
        reportUrl, // 后端url
        autoTracker, // 自动埋点
        delay, // 延迟和合并上报的功能
        hashPage, // 是否hash录有
        errorReport, // 是否开启错误监控
        performanceReport // 是否开启性能监控
    } = options;

    // --------- appId ----------------
    // if (appId) {
    //     window['_monitor_app_id_'] = appId;
    // }
    //
    // --------- userId ----------------
    if (cookie) {
        window['_monitor_user_cookie_'] = cookie;
    }

    // --------- 服务端地址 ----------------
    if (reportUrl) {
        window['_monitor_report_url_'] = reportUrl;
    }

    // -------- 合并上报的间隔 ------------
    if (delay) {
        window['_monitor_delay_'] = delay;
    }

    // --------- 是否开启错误监控和白屏监控 ------------
    if (errorReport) {
        errorCatch();
        blankScreen();
    }
    //
    // // --------- 是否开启无痕埋点 ----------
    // if (autoTracker) {
    //     autoTrackerReport();
    // }

    // ----------- 路由监听 --------------
    if (hashPage) {
        hashPageTrack(); // hash路由上报
    } else {
        historyPageTrack(); // history路由上报
    }

    // ----------- 性能监控 --------------
    if (performanceReport) {
        getPerformance();
    }
}
