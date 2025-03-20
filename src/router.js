import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import CustomerPage from './components/CustomerPage.vue';
import DepartmentPage from './components/DepartmentPage.vue';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/customer',
    name: 'Customer',
    component: CustomerPage,
  },
  {
    path: '/department',
    name: 'Department',
    component: DepartmentPage,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/home'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;