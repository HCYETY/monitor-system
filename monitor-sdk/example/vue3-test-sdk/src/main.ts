import { createApp } from "vue";
import App from "./App.vue";
import { errorCatch, getPerformance, pageTrack } from "monitor-sdk";
// import router from "./router";

// import "./assets/main.css";

const app = createApp(App);

errorCatch();
getPerformance();
pageTrack();

// app.use(router);

app.mount("#app");
