import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailsPost from "../views/DetailsPost.vue";
import CreatePost from "../views/CreatePost.vue";
import TagPosts from "../views/TagPosts.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/posts/:id",
    name: "Details",
    component: DetailsPost,
    props: true,
  },
  {
    path: "/create",
    name: "Create",
    component: CreatePost,
  },
  {
    path: "/tags/:tag",
    name: "Tag",
    component: TagPosts,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
