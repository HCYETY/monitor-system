import { addCache, getCache, clearCache } from "../handle/cache";

let timer = null;

export function lazyReport(interfaceUrl: string, param): void {
    const cookie: string = window['_monitor_user_cookie_'];
    const delay: number = window['_monitor_delay_'];

    const logParams = {
        cookie, // 用户id
        interfaceUrl, // error/action/visit/user
        data: param, // 上报的数据
        currentTime: new Date().getTime(),
        currentPage: window.location.href,
        ua: window.navigator.userAgent,
    }

    // let logParamsString = JSON.stringify(logParams);
    //     addCache(logParamsString);

    // const data = getCache();
    // let data = JSON.stringify(param);

    // if (delay === 0) {
        return index(interfaceUrl, logParams);
    // }

      // if (data.length > 10) {
      //   index(interfaceUrl, data);
      //   clearTimeout(timer);
      //   return;
      // }

    // clearTimeout(timer);
    //
    // timer = setTimeout(() => {
    //     index(interfaceUrl, logParams);
    // }, delay);
}

export function index(interfaceUrl: string, data: object): void {
  const url = window['_monitor_report_url_'];

  // ------- fetch方式上报 -------
  // 跨域问题
  // fetch(url, {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }).then(res => {
  //   console.log(res);
  // }).catch(err => {
  //   console.error(err);
  // })

  // ------- navigator/img方式上报 -------
  // 不会有跨域问题
  if (navigator.sendBeacon) { // 支持sendBeacon的浏览器
    navigator.sendBeacon(url + interfaceUrl, JSON.stringify(data));
  } else { // 不支持sendBeacon的浏览器
      let oImage = new Image();
    oImage.src = `${url}${interfaceUrl}?logs=${data}`;
  }
  // clearCache();
}
