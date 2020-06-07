// npm imports
import Vue from 'vue';

// other imports
import VueRouter, { RouteConfig } from 'vue-router';
import Home from './views/Home.vue';

// use vue router plugin
Vue.use(VueRouter);

// create all routes
const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
  },
  {
    // default
    path: '*',
    redirect: '/home'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
export default router;
