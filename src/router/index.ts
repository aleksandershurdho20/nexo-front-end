import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '@/views/Auth/Register.vue'
import Login from '@/views/Auth/Login.vue'
import Dashboard from '@/views/Dashboard/Dashboard.vue'
import { authStore } from '@/store/auth'

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
