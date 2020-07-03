// npm imports
import Vue from 'vue';

// other imports
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from './views/HomeView.vue';
import FishView from './views/FishView.vue';
import BugsView from './views/BugsView.vue';

// use vue router plugin
Vue.use(VueRouter);

// create all routes
const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/fish',
    name: 'Fish',
    component: FishView
  },
  {
    path: '/bugs',
    name: 'Bugs',
    component: BugsView
  },
  {
    // add beforeenter here to check if user is logged in
    path: '/user',
    name: 'User',
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
