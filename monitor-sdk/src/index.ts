import { loadConfig } from './common/loadConfig';
import { pageTrack } from './common/pageTrack';
import { errorCatch } from './common/errorTrack';
import { getPerformance } from "./common/performanceTrack";
import { initOptions } from "./type";
// import { lazyReport, report } from './common/report';
// import { getCache } from './common/cache';

/**
 * 初始化配置
 * @param {*} options
 */
function init(options: initOptions) {
    // ------- 加载配置 ----------
    // 1.拿到配置信息
    // 2.注入监控代码
    loadConfig(options);

    // 监控页面性能
    getPerformance();

    // 监控路由跳转
    pageTrack();

    // // -------- uv统计 -----------
    // lazyReport('user', '加载应用');
    //
    // // ------ 防止卸载时还有剩余的埋点数据没发送 ------
    // window.addEventListener('unload', () => {
    //     const data = getCache();
    //     report(data);
    //
    //     // if (data.length > 0) {
    //     //   report(data);
    //     // }
    // });
}

// export { init, tracker, errorCatch };
export { init, errorCatch, getPerformance, pageTrack };