// export default function injectXHR() {
//   let XMLHttpRequest = window.XMLHttpRequest;
//   let oldOpen = XMLHttpRequest.prototype.open;
//   XMLHttpRequest.prototype.open = function (
//     method,
//     url,
//     async,
//     username,
//     password
//   ) {

//     if (!(url as string).match(/logstores/) && !(url as string).match(/sockjs/)) {
//       this.logData = {
//         method,
//         url,
//         async,
//         username,
//         password,
//       };
//     }
//     return oldOpen.apply(this, arguments as any);

//   }
//   let oldSend = XMLHttpRequest.prototype.send;
//   let start;
//   XMLHttpRequest.prototype.send = function (body) {
//     if (this.logData) {
//       start = Date.now();
//       let handler = (type) => (event) => {
//         let duration = Date.now() - start;
//         let status = this.status;
//         let statusText = this.statusText;
//         tracker.send({
//           //未捕获的promise错误
//           kind: "stability", //稳定性指标
//           type: "xhr", //xhr
//           eventType: type, //load error abort
//           pathname: this.logData.url, //接口的url地址
//           status: status + "-" + statusText,
//           duration: "" + duration, //接口耗时
//           response: this.response ? JSON.stringify(this.response) : "",
//           params: body || "",
//         });
//       };
//       this.addEventListener("load", handler("load"), false);
//       this.addEventListener("error", handler("error"), false);
//       this.addEventListener("abort", handler("abort"), false);
//     }
//     oldSend.apply(this, arguments);
//   };
// };