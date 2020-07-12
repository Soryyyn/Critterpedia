<template>
  <div v-bind:id="pageName + '_grid'" :style="wrapperStyle">
    <h1 :style="titleStyle">{{pageName}}</h1>

    <div id="sorters">
      <button :style="getStyle(this.sortedByNumber)" @click="setSortedByNumber()">
        <i class="fas fa-sort-numeric-up"></i> Number
      </button>
      <button :style="getStyle(this.sortedByHighestPrice)" @click="setSortedByHighestPrice()">
        <i class="fas fa-dollar-sign"></i> Highest Price
      </button>
    </div>

    <ul id="grid">
      <CardComponent
        v-for="creature in this.copyOfCreatures"
        v-bind:key="creature.id"
        v-bind:creature="creature"
        v-bind:creatureType="creatureType"
        v-bind:loggedIn="loggedIn"
      ></CardComponent>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import CardComponent from "@/components/CardComponent.vue";
import * as _ from "lodash";

export default Vue.extend({
  name: "GridComponent",
  components: {
    "CardComponent": CardComponent
  },
  props: [
    "pageName",
    "creatures",
    "creatureType",
    "loggedIn"
  ],

  data() {
    return {
      sortedByNumber: true,
      sortedByHighestPrice: false,
      copyOfCreatures: { ...this.creatures }
    }
  },

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
            font-size: 72px;
            text-align: center;
            -webkit-text-stroke-width: 2px;
            font-family: "Biko Black";
            margin-bottom: -15px;
            letter-spacing: 4px;
        `;

      if (this.pageName == "Fish") {
        style += `
            color: var(--fishTitleColor);
            text-shadow: 3px 3px 0px var(--fishTitleShadow);
            -webkit-text-stroke-color: var(--fishTitleAccent);
          `;
      } else if (this.pageName == "Bugs") {
        style += `
            color: var(--bugsTitleColor);
            text-shadow: 3px 3px 0px var(--bugsTitleShadow);
            -webkit-text-stroke-color: var(--bugsTitleAccent);
          `;
      }

      return style;
    },

  },

  methods: {

    setSortedByNumber() {
      if (!this.sortedByNumber) {
        this.sortedByNumber = true;
        this.sortedByHighestPrice = false;

        // @ts-ignore
        this.copyOfCreatures = _.sortBy(this.copyOfCreatures, "id", "asc");
      }
    },

    setSortedByHighestPrice() {
      if (!this.sortedByHighestPrice) {
        this.sortedByHighestPrice = true;
        this.sortedByNumber = false;

        // @ts-ignore
        this.copyOfCreatures = _.sortBy(this.copyOfCreatures, "price", "asc").reverse();
      }
    },

    getStyle(sortMethod: boolean) {
      if (sortMethod) {
        return `
          background: var(--mainColor_Light_Accent);
          border: 2px solid var(--mainColor_Light_Active);
          box-shadow: 5px 5px 0px var(--mainColor_Light_Active);
        `;
      } else {
        return `
          background: var(--mainColor_Light_Lighter);
        `;
      }
    }

  },

});
</script>

<style lang="scss" scoped>
ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  margin-bottom: 1.5rem;
}

@media screen and (max-width: 1200px) {
  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-bottom: 1.5rem;
  }
}

@media screen and (max-width: 750px) {
  ul {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 15px;
    margin-bottom: 1.5rem;
  }
}

#sorters {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin: 20px 10px;
    padding: 10px;
    background: var(--mainColor_Light_Lighter);
    border: 2px solid var(--mainColor_Light_Accent);
    border-radius: 10px;
    box-shadow: 5px 5px 0px var(--mainColor_Light_Accent);
    transition: 0.1s ease-in-out;
    color: rgba(28, 26, 31, 1);
    font-size: 16px;
    font-family: "Biko Bold";
    user-select: none;
    cursor: pointer;

    i {
      margin-right: 5px;
    }

    &:focus {
      outline: none;
    }

    &:hover {
      transition: 0.1s ease-in-out;
      transform: scale(1.05);
      border: 2px solid var(--mainColor_Light_Active);
      box-shadow: 5px 5px 0px var(--mainColor_Light_Active);
    }
  }
}
</style>
