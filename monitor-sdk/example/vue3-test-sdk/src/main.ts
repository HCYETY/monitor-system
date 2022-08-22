import { errorCatch } from "monitor-system-sdk";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import "./assets/main.css";

const app = createApp(App);

errorCatch();
app.use(router);

app.mount("#app");
