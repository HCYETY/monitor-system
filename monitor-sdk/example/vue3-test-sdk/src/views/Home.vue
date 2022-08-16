<template>
  <div class="left">
    <h1>异常数据</h1>

    <h2>前端异常</h2>
    <button class="hello" @click="bugJs">JS 代码执行异常</button>
    <button class="world" @click="bugPromise">Promise 异常</button>
    <button class="hi" @click="bugAsset">静态资源加载异常</button>
    <button class="foursheep" @click="bugConsole">console.error 异常</button>
    <button class="good" @click="bugCors">跨域异常</button>
    <!-- <img src="http://localhost:8888/nottrue.jpg" /> -->

    <br />

    <h2>接口异常</h2>
    <button @click="bugNoRespond">未响应/超时响应异常</button>
    <button @click="bugInterface4">4xx 请求异常</button>
    <button @click="bugInterface5">5xx 服务器异常</button>
    <button @click="bugPowerless">权限不足</button>

    <h1>白屏异常</h1>
    <button @click="bugWhiteScreen">白屏异常</button>
  </div>

  <div class="right">
    <h1>行为数据</h1>
    <button>用户设备类型，浏览器版本，webview引擎类型</button>
    <button>获取页面性能指标</button>
    <button>点击事件</button>
    <button>
      <RouterLink to="/">路由跳转</RouterLink>
    </button>
    <button @click="getPv">PV、UV</button>
  </div>

  <!--  <br />-->
  <!--  <hr />-->
  <!--  <br />-->

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
import { axiosIntance } from "@/utils/axios";
import axios from "axios";
import { login } from "@/api/modules/user";
const bugJs = () => {
  window.someVar.error = "error";
};
const bugPromise = () => {
  new Promise(function (_, reject) {
    window.someVar.error = "error";
  });
};
const bugAsset = function () {
  console.log("bugAsset");
};
const bugConsole = function () {
  console.error(new Error("错误捕获222"));
};
const bugCors = function () {
  login({
    url: "/test",
    method: "post",
    data: "你好foursheep",
  });
  //     console.error(e);
  //     // if (ErrorEvent) {
  //     //   window.dispatchEvent(new ErrorEvent('error', { e, message: e.message })) // 这里也会触发window.onerror
  //     // } else {
  //     //   window.onerror && window.onerror(null, null, null, null, e)
  //     // }
  //
};
const bugNoRespond = function () {
  // timeout
  axiosIntance
    .get("/api", {
      timeout: 10,
    })
    .then((res) => {
      console.log("请求成功");
      console.log(res);
    })
    .catch((e) => {
      console.log("请求失败");
      console.log(e);
    });
};
const bugInterface4 = function () {
  // 404
  axios
    .get("/api")
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log("请求失败");
      console.log(e);
    });

  // 200
  // axiosIntance
  //   .get("/api/info")
  //   .then((res) => {
  //     console.log("请求成功");
  //     console.log(res);
  //   })
  //   .catch((e) => {
  //     console.log("请求失败");
  //     console.log(e);
  // });
};
const getPv = () => {
  console.log("getPv");
};
const bugInterface5 = function () {
  fetch("/asdasdasdasd", {
    method: "post",
    body: "kongming",
  });
};
const bugPowerless = function () {
  console.log("powerless");
};
const bugWhiteScreen = function () {
  console.log("页面 load 时已监控");
};
</script>

<style></style>
