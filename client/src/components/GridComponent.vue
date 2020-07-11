<template>
  <div v-bind:id="pageName" :style="wrapperStyle">
    <h1 :style="titleStyle">{{pageName}}</h1>
    <ul id="grid">
      <CardComponent
        v-for="creature in creatures"
        v-bind:key="creature.id"
        v-bind:creature="creature"
      ></CardComponent>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import CardComponent from "@/components/CardComponent.vue";

export default Vue.extend({
  name: "GridComponent",
  components: {
    "CardComponent": CardComponent
  },
  props: [
    "pageName",
    "creatures"
  ],
  computed: {
    wrapperStyle() {
      return `
        padding: 10px;
        position: relative;
        top: 0;
        `;
    },

    titleStyle() {
      let style = `
            font-size: 64px;
            text-align: center;
            margin-bottom: 1.5rem;
            -webkit-text-stroke-width: 2px;
            font-family: "Biko Black";
        `;

      if (this.pageName == "Fish") {
        style += `
            color: var(--fishTitleColor);
            text-shadow: 3px 3px 0px var(--fishTitleShadow);
            -webkit-text-stroke-color: var(--fishTitleAccent);
          `;
      } else if (this.pageName == "Bugs") {

      }

      return style;
    }
  }
});
</script>

<style lang="scss" scoped>
ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin-bottom: 1.5rem;
}
</style>
