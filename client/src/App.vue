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

:root {
  --mainColor_Light_Main: rgb(255, 239, 225);
  --mainColor_Light_Lighter: rgb(255, 250, 246);
  --mainColor_Light_Accent: rgb(255, 218, 185);
  --mainColor_Light_Active: rgb(255, 189, 132);
  --mainColor_Light_Scrollbar: rgb(247, 140, 47);
  --mainColor_Light_CardNumber: rgba(255, 218, 185, 0.3);

  --fontColor: rgb(28, 26, 31);
  --fontShadow: rgba(28, 26, 31, 0.3);
  --fontLighterColor: rgb(75, 71, 82);

  --fishTitleColor: rgb(85, 175, 211);
  --fishTitleAccent: rgb(51, 103, 124);
  --fishTitleShadow: rgba(51, 103, 124, 0.3);

  --bugsTitleColor: rgb(142, 211, 85);
  --bugsTitleLighter: rgb(185, 243, 137);
  --bugsTitleAccent: rgb(82, 122, 48);
  --bugsTitleShadow: rgba(82, 122, 48, 0.3);

  --yellowMain: rgb(255, 205, 67);
  --yellowLighter: rgb(245, 218, 146);
  --yellowAccent: rgb(172, 138, 45);
  --yellowShadow: rgba(172, 138, 45, 0.3);
}

* {
  padding: 0;
  margin: 0;
}

body,
html {
  height: 100%;
  width: 100%;
  background: var(--mainColor_Light_Main);
}

body {
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--mainColor_Light_Scrollbar);
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

  &.error {
    padding: 2rem 2rem;
    border: none;
    border-radius: 10px;
    background: rgb(255, 90, 90);
    color: black;
  }
}
</style>
