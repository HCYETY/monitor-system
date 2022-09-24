import { loadConfig } from '@monitor/load/loadConfig';
import { historyPageTrack, hashPageTrack } from '@monitor/handle/pageTrack';
import { errorCatch } from '@monitor/handle/errorTrack';
import { getPerformance } from '@monitor/handle/performance';
import { initOptions } from '@type';
import { lazyReport, index } from '@monitor/report';
import { getCache } from '@monitor/handle/cache';

/**
 * 初始化配置
 * @param {*} options
 */
function init(options: initOptions) {
    // ------- 加载配置 ----------
    // 1.拿到配置信息
    // 2.注入监控代码
    loadConfig(options);

  // // -------- uv统计 -----------
  // lazyReport('user', '加载应用');
  //
  // ------ 防止卸载时还有剩余的埋点数据没发送 ------
  // window.addEventListener('unload', () => {
  //     const data = getCache();
  //     // index(data);
  //
  //     if (data.length > 0) {
  //       index(data);
  //     }
  // });
}
// errorCatch();
getPerformance();

export { init, errorCatch };
