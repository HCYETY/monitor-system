<template>
  <div class="left">
    <strong>异常数据</strong>

    <h2>前端异常</h2>
    <button class="hello" @click="bugJs">JS 代码执行异常</button>
    <button class="world" @click="bugPromise">Promise 异常</button>
  </div>
  <button class="hi" @click="bugAsset">静态资源加载异常</button>
  <button class="foursheep" @click="bugConsole">console.error 异常</button>
  <!-- <button class="good" @click="bugCors()">跨域异常</button> -->
  <img src="http://localhost:8888/nottrue.jpg" />

  <br />
  <!--
    <h2>接口异常</h2>
    <button @click="bugNoRespond()">未响应/超时响应异常</button>
    <button @click="bugInterface4()">4xx 请求异常</button>
    <button @click="bugInterface5()">5xx 服务器异常</button>
    <button @click="bugPowerless()">权限不足</button>

    <h1>白屏异常</h1>
    <button type="info" @click="bugWhiteScreen()">白屏异常</button>
  </div>

  <div class="right">
    <strong>行为数据</strong><br />
    <button @click="getPerform()">获取性能数据</button>
    <button @click="getClickInform()">点击事件</button>
    <button>
      <RouterLink to="/">路由跳转</RouterLink>
    </button>
    <button @click="getPv()">PV、UV</button>
    <button @click="bugHttp()">HTTP 请求监控</button>
    <button @click="getUserAgentInform()">
      用户设备类型，浏览器版本，webview引擎类型
    </button>
  </div>

  <br />
  <hr />
  <br /> -->

  <!--    <div>-->
  <!--      <strong><h1>性能监控</h1></strong>-->
  <!--      <button @click="">白屏时间</button>-->
  <!--      <button @click="">页面资源加载耗时</button>-->
  <!--      <button @click="">首屏渲染耗时</button>-->
  <!--      <button @click="">接口请求耗时</button>-->
  <!--      <button @click="">收集长时间运行任务（longtasks）</button>-->
  <!--    </div>-->
</template>

<script setup lang="ts">
const bugJs = () => {
  window.someVar.error = "error";
};
const bugPromise = () => {
  new Promise(function (resolve, reject) {
    window.someVar.error = "error";
  });
};
// ========================制造bug=============================
// import { getUserAgent } from "common/pageTrack";
// const bugJs = () => {
//   window.someVar.error = "error";
// };
//   return new Promise(function (resolve, reject) {
//     // window.someVar.error = 'error';
//   }).catch();
// };
const bugAsset = function () {
  console.log("bugAsset");
};
const bugConsole = function () {
  console.error(new Error("错误捕获222"));
};
// const bugCors = function () {
//   // try {
//   //     request({
//   //         url: "/test",
//   //         method: "post",
//   //         data: '你好foursheep',
//   //     });
//   // } catch (e) {
//   //     console.error(e);
//   //     // if (ErrorEvent) {
//   //     //   window.dispatchEvent(new ErrorEvent('error', { e, message: e.message })) // 这里也会触发window.onerror
//   //     // } else {
//   //     //   window.onerror && window.onerror(null, null, null, null, e)
//   //     // }
//   //
//   //     // window.addEventListener('error', (e) => {
//   //     //   console.log('捕获到跨域报错', e);
//   //     // })
//   // }
// };
// const bugNoRespond = function () {};
// const bugInterface4 = function () {
//   // request({
//   //   url: "/test",
//   //   method: "post",
//   //   data: "你好foursheep",
//   // });
// };
// const bugInterface5 = function () {};
// const bugPowerless = function () {};
// const bugWhiteScreen = function () {};
// const bugHttp = function () {};
// // const getUserAgentInform = function () {
//   // const userAgentObj = getUserAgent();
//   // console.log("userAgentObj", userAgentObj);
// // }; -->
</script>

<style></style>
