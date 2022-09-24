import { handleJs, handlePromise, initHttpHandler, injectConsole } from '@monitor/handle/baseHandler';

export function errorCatch() {
  console.log('%c%s', 'font-size: 24px; color: red', '开始监控网页报错');

  // 监控 js/资源/跨域 错误
  window.addEventListener(
    'error',
    event => {
      handleJs(event)
    },
    true
  )

  // 监控 promise 错误
  window.addEventListener(
    'unhandledrejection',
    event => {
      handlePromise(event)
    },
    true
  )

  // 监控 console.error 错误
  injectConsole();

  // 监控 http 错误
  initHttpHandler();
}
