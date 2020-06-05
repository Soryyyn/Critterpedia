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
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
export default router;
