import { addCache, getCache } from "./cache";

export function lazyReport(type, param) {
  const logParams = {
    data: param,
    currentTime: new Date().getTime(),
    currentPage: window.location.href,
    ua: window.navigator.userAgent,
  }

  let logParamsString = JSON.stringify(logParams);
  addCache(logParamsString);


  // const data = getCache()

  // if (dalay === 0) {
  //   report(data)
  //   return
  // }

  // if (data.length > 10) {
  //   report(data)
  //   clearTimeout(timer)
  //   return
  // }

  // clearTimeout(timer)

  // timer = setTimeout(() => {
  //   report(data)
  //  }, dalay)
}
// export function report(data) {
//   const url = window['_monitor_report_url_'];

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
  // if (navigator.sendBeacon) { // 支持sendBeacon的浏览器
  //   navigator.sendBeacon(url, JSON.stringify(data));
  // } else { // 不支持sendBeacon的浏览器
  //   let oImage = new Image();
  //   oImage.src = `${url}?logs=${data}`;
  // }
  // clearCache();
// }

