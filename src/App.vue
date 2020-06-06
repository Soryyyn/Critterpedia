<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
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

// ".router-link-exact-active" used for style current nav
</style>
