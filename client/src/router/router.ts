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
    component: HomeComponent,
    meta: {
      title: "Home | Critterpedia"
    }
  },
  {
    path: '/fish',
    name: 'Fish',
    component: FishComponent,
    meta: {
      title: "Fish | Critterpedia"
    }
  },
  {
    path: '/bugs',
    name: 'Bugs',
    component: BugsComponent,
    meta: {
      title: "Bugs | Critterpedia"
    }
  },
  {
    // add beforeenter here to check if user is logged in
    path: '/signup',
    name: 'Signup',
    component: SignupComponent,
    meta: {
      title: "Signup | Critterpedia"
    }
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
