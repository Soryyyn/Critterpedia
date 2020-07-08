// npm modules
import Vue from 'vue';
import App from './App.vue';

// other imports
import router from './router/router';
const VueSession = require('vue-session');

Vue.use(VueSession);

// hide console msg
Vue.config.productionTip = false;

// mount app on div#app
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

// if user leaves page destroy session
window.addEventListener("beforeunload", () => {
  // @ts-ignore
  if (this.$session.exists()) {
    // @ts-ignore
    this.$session.destroy();
  }
}, false);
