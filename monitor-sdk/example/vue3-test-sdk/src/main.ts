import { createApp } from "vue";
import App from "./App.vue";
// @ts-ignore
import { init, errorCatch, } from "monitor-sdk";
// import { init, errorCatch, } from "monitor-system-sdk";
import router from "./router";

// import "./assets/main.css";

const app = createApp(App);

init({
    // appId,  // 系统id
    cookie: 'foursheep', // 用户id
    // userId: window.localStorage.getItem('session_id') || 'foursheep', // 用户id
    reportUrl: 'http://localhost:8080/report', // 后端url
    // autoTracker, // 自动埋点
    delay: 0, // 延迟和合并上报的功能
    hashPage: true, // 是否是 hash 路由
    errorReport: true, // 是否开启错误监控
    performanceReport: true // 是否开启性能监控
})

app.use(router);

app.mount("#app");
