import { handleJs, handlePromise, initHttpHandler } from "../util/baseHandler";
import injectConsole from "./injectConsole";

export function errorCatch() {
    console.log('%c%s', 'font-size: 24px; color: red', '开始监控网页报错');

    // 监控 js 错误
    window.addEventListener('error', (event) => {
        handleJs(event);
    }, true)

    // 监控 promise 错误
    window.addEventListener('unhandledrejection', (event) => {
        handlePromise(event);
    }, true)

    // ------ console -------
    injectConsole()
    // ------  http  --------
    initHttpHandler()
}