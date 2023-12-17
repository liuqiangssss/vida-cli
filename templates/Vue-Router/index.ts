import { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/home";

const routes = [
  {
    path: "/",
    component: Home,
    // children: [
    //   {
    //     path: "",
    //     name: "Home",
    //     component: () => import("@/pages/Home"),
    //   },
    // ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function registerRouter(app: App) {
  app.use(router);
}
