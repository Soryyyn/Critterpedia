// npm imports
import Vue from 'vue';

// other imports
import VueRouter, { RouteConfig } from 'vue-router';
import HomeComponent from '@/components/HomeComponent.vue';
import FishComponent from '@/components/FishComponent.vue';
import BugsComponent from '@/components/BugsComponent.vue';
import SignupComponent from '@/components/SignupComponent.vue';

// use vue router plugin
Vue.use(VueRouter);

// create all routes
const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'Home',
    component: HomeComponent
  },
  {
    path: '/fish',
    name: 'Fish',
    component: FishComponent
  },
  {
    path: '/bugs',
    name: 'Bugs',
    component: BugsComponent
  },
  {
    // add beforeenter here to check if user is logged in
    path: '/signup',
    name: 'Signup',
    component: SignupComponent
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
