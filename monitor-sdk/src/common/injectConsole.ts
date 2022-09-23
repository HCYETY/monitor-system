import {lazyReport} from "@/common/report";
import { ConsoleError } from './../util/ConsoleError'

export default function injectConsole() {
  // ------  console.error  --------
  let consoleError = window.console.error;
  window.console.error = function (error) {
    if (error != '参数有缺失') {
      const { message, stack } = error;
      let column: number = 0;
      let row: number = 0;
      let url = window.location.href;

      const consoleErrorData = createConsoleError(message, column, row, stack, url);

      if (stack) {
        let mres = stack.match(/\(.*?\)/g) || [];
        let firstLine = (mres[0] || '').replace('(', '').replace(')', '') // 获取到堆栈信息的第一条

        // 根据:分隔获取行列
        let info = firstLine.split(':');
        row = +info[info.length - 2]; // 行
        column = +info[info.length - 1]; // 列
      }

      // setTimeout(function () {
      // 上报错误内容
      consoleErrorData.row = row;
      consoleErrorData.column = column;
      // let opt = {
      //   url,
      //   row,
      //   column,
      //   message,
      //   stack, // 错误堆栈信息
      // }
      console.log('error捕获', consoleErrorData);
      lazyReport('/console-error', consoleErrorData);
      // }, 0);
    }

    return consoleError.apply(console, arguments as any);

    function createConsoleError(
      message: any,
      column: number,
      row: number,
      stack: any,
      url: string
    ) {
      return new ConsoleError(message, column, row, stack, url);
    }
  }
}
