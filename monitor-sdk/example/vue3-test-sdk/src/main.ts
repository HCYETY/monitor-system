import { createApp } from "vue";
import App from "./App.vue";
import { init, errorCatch, } from "monitor-sdk";
import router from "./router";

// import "./assets/main.css";

const app = createApp(App);

init({
    // appId,  // 系统id
    // userId, // 用户id
    // reportUrl, // 后端url
    // autoTracker, // 自动埋点
    // delay, // 延迟和合并上报的功能
    hashPage: true, // 是否hash录有
    errorReport: true, // 是否开启错误监控
    performanceReport: true // 是否开启性能监控
})

app.use(router);

app.mount("#app");
