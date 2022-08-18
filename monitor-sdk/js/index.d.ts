import { errorCatch } from './common/errorTrack';
import { initOptions } from "./type";
/**
 * 初始化配置
 * @param {*} options
 */
declare function init(options: initOptions): void;
export { init, errorCatch };
