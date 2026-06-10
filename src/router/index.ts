import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { getPostBySlug } from "@/data/blog-posts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { title: "空羽ノ境 - Home" },
    },
    {
      path: "/galgame",
      name: "galgame",
      component: () => import("@/views/CategoryView.vue"),
      meta: { title: "Galgame - 空羽ノ境" },
    },
    {
      path: "/anime",
      name: "anime",
      component: () => import("@/views/CategoryView.vue"),
      meta: { title: "二次元天地 - 空羽ノ境" },
    },
    {
      path: "/thoughts",
      name: "thoughts",
      component: () => import("@/views/CategoryView.vue"),
      meta: { title: "心境與筆記 - 空羽ノ境" },
    },
    {
      path: "/health",
      name: "health",
      component: () => import("@/views/CategoryView.vue"),
      meta: { title: "健康知識 - 空羽ノ境" },
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("@/views/BlogListView.vue"),
      meta: { title: "星塵書庫 - 空羽ノ境" },
    },
    {
      path: "/blog/:slug",
      name: "blog-post",
      component: () => import("@/views/BlogPostView.vue"),
      meta: { title: "文章 - 空羽ノ境" },
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (_to.hash) {
      return { el: _to.hash, behavior: "smooth" };
    }
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach((to, _from, next) => {
  let title = to.meta.title as string | undefined;

  // Dynamic title for blog post pages
  if (to.name === "blog-post" && to.params.slug) {
    const post = getPostBySlug(to.params.slug as string);
    if (post) {
      title = `${post.title} - 空羽ノ境`;
    }
  }

  if (title) {
    document.title = title;
  }
  next();
});

export default router;
