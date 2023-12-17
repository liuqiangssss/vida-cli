import { createApp } from "vue";
import "./index.css";
import App from "./App.tsx";
import { setDirectives } from "@/directives";
const app = createApp(App);

function bootStrap() {
  setDirectives(app);
  app.mount("#app");
}

bootStrap();
