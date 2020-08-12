// npm imports
import Vue from 'vue';

// other imports
import VueRouter, { RouteConfig } from 'vue-router';
import HomeComponent from '@/components/HomeComponent.vue';
import FishComponent from '@/components/FishComponent.vue';
import BugsComponent from '@/components/BugsComponent.vue';
import SignupComponent from '@/components/SignupComponent.vue';
import SigninComponent from '@/components/SigninComponent.vue';
import SettingsComponent from '@/components/SettingsComponent.vue';
import SponsorComponent from '@/components/SponsorComponent.vue';
import AuthComponent from '@/components/AuthComponent.vue';

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
    path: '/signup',
    name: 'Signup',
    component: SignupComponent,
    meta: {
      title: "Signup | Critterpedia"
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SigninComponent,
    meta: {
      title: "Signin | Critterpedia"
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsComponent,
    meta: {
      title: "Settings | Critterpedia"
    }
  },
  {
    path: '/sponsor',
    name: 'Sponsor',
    component: SponsorComponent,
    meta: {
      title: "Sponsor | Critterpedia"
    }
  },
  {
    path: "/auth",
    name: "Auth",
    component: AuthComponent,
    meta: {
      title: "Authentication | Critterpedia"
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
