
export default function injectConsole() {
  // ------  console.error  --------
  let consoleError = window.console.error;
  window.console.error = function (error) {
    if (error != '参数有缺失') {
      const message: string = error.message;
      const stack = error.stack;
      const url: string = window.location.href;
      let row: number = 0, column: number = 0;
      if (stack) {
        let mres = stack.match(/\(.*?\)/g) || [];
        let firstLine = (mres[0] || "").replace("(", "").replace(")", ""); // 获取到堆栈信息的第一条

        // 根据:分隔获取行列
        let info = firstLine.split(':')
        row = info[info.length - 2] // 行
        column = info[info.length - 1] // 列
      }

      // setTimeout(function () {
      // 上报错误内容
      let opt = {
        url,
        row,
        column,
        message,
        stack // 错误堆栈信息
      }
      console.log('error捕获', opt);
      // }, 0);
    }

    return consoleError.apply(console, arguments as any);
  };
};
