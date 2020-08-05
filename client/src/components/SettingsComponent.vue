<template>
  <div id="settings">
    <div id="wrapper">
      <h1>Settings</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "SettingsComponent",

  data() {
    return {
      currentSettings: {}
    }
  },

  created() {
    // get settings from server and save them
    // and show them
  }
})
</script>

<style lang="scss" scoped>
#settings {
  width: 100%;
  height: auto;
  position: relative;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

#wrapper {
  height: 100%;
  margin-top: 10%;
}

h1 {
  font-size: 64px;
  text-align: center;

  margin-bottom: 1rem;

  color: rgb(184, 184, 184);
  font-family: "Biko Black";
  text-shadow: 3px 3px 0px rgba(100, 100, 100, 0.2);
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: rgb(100, 100, 100);
}
</style>