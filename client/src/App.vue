<template>
  <div id="app">
    <Navigation></Navigation>
    <notifications position="bottom right" />
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
  },
  watch: {
    '$route': {
      handler: (to, from) => {
        document.title = to.meta.title || 'Critterpedia'
      },
      immediate: true
    }
  },
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

body {
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: darken(rgb(255, 239, 225), 30%);
    border-radius: 20px;
  }
}

.vue-notification {
  margin: 0 5px 5px;
  font-family: "Biko Regular";

  .notification-title {
    font-family: "Biko Bold";
    font-size: 20px;
    margin-bottom: 15px;
    padding-bottom: 5px;
    border-bottom: rgba(0, 0, 0, 0.1) 2px solid;
  }

  .notification-content {
    font-size: 16px;
  }

  &.catching {
    padding: 2rem 2rem;
    border: none;
    border-radius: 10px;
    background: rgb(142, 211, 85);
    color: black;
  }

  &.favorite {
    padding: 2rem 2rem;
    border: none;
    border-radius: 10px;
    background: rgb(255, 205, 67);
    color: black;
  }
}
</style>
