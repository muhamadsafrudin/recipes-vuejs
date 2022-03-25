import { createRouter, createWebHistory } from "vue-router";  

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "/",
      component: () => import("../views/Home.vue"),
    },
    // modif
    {
      path: "/home",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/home/:key",
      name: "home-key",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/detail/:key",
      name: "detail",
      component: () => import("../views/Detail.vue"),
    },
    {
      path: "/favorite",
      name: "favorite",
      component: () => import("../views/Favorite.vue"),
    },
  ],
});


export default router;
