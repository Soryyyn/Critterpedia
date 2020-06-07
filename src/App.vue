<template>
  <div id="app">
    <Navigation></Navigation>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NavComponent from '@/components/NavComponent.vue';

export default Vue.extend({
  name: 'app',
  components: {
    'Navigation': NavComponent
  }
})
</script>

<style lang="scss">
// import font awesome icons
@import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

// import fonts
@font-face {
  font-family: "Biko Regular";
  src: url("./assets/fonts/Biko_Regular.otf");
}
@font-face {
  font-family: "Biko Bold";
  src: url("./assets/fonts/Biko_Bold.otf");
}
@font-face {
  font-family: "Biko Black";
  src: url("./assets/fonts/Biko_Black.otf");
}

* {
  padding: 0;
  margin: 0;
}

body,
html {
  height: 100%;
  width: 100%;
  background: rgb(255, 239, 225);
}
</style>
