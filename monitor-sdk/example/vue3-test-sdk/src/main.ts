import { createApp } from "vue";
import App from "./App.vue";
import { errorCatch } from "monitor-sdk";
// import router from "./router";

// import "./assets/main.css";

const app = createApp(App);

errorCatch();

// app.use(router);

app.mount("#app");
