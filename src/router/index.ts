import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '@/views/Auth/Register.vue'
import Login from '@/views/Auth/Login.vue'
import Dashboard from '@/views/Dashboard/Dashboard.vue'
import { authStore } from '@/store/auth'
import CreatePost from '@/views/Posts/CreatePost.vue'
import Posts from '@/views/Posts/Posts.vue'
import ViewPost from '@/views/Posts/ViewPost.vue'
import FavoritePosts from '@/views/Posts/FavoritePosts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta:{ requiresAuth:true}
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: CreatePost,
      meta:{ requiresAuth:true}
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts,
      meta:{ requiresAuth:true}
    },
    {
      path: '/post/:id',
      name: 'view-post',
      component: ViewPost,
    },
    {
      path: '/favorite-posts',
      name: 'favorite-posts',
      component: FavoritePosts,
      meta:{ requiresAuth:true}
    },
   
  ],
})
router.beforeEach((to, from, next) => {
  const { isLoggedIn } = authStore();
  if (to.matched.some((record) => record.meta.requiresAuth && !isLoggedIn)) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router
