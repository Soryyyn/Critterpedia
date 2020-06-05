// npm modules
import Vue from 'vue';
import App from './App.vue';

// other imports
import router from './router/router';

// hide console msg
Vue.config.productionTip = false;

// mount app on div#app
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
