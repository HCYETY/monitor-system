import { createApp } from "vue";
import App from "./App.vue";
import { errorCatch, getPerformance, historyPageTrack, hashPageTrack } from "monitor-sdk";
import router from "./router";

// import "./assets/main.css";

const app = createApp(App);

errorCatch();
getPerformance();
historyPageTrack();

app.use(router);

app.mount("#app");
