<template>
  <div id="fish">
    <h1>All Fish</h1>
    <ul id="grid">
      <li v-for="fish in fishes" v-bind:key="fish.id" v-bind:id="fish.id + '_' + fish.name">
        <p>#{{fish.id}}</p>
        <p>Name: {{fish.name}}</p>
        <p>Description: {{fish.description}}</p>
        <p>North: {{fish.time_of_year_north}}</p>
        <p>South: {{fish.time_of_year_south}}</p>
        <p>Time: {{fish.time_of_day_start}} - {{fish.time_of_day_end}}</p>
        <p>Location: {{fish.location}}</p>
        <p>Shadow Size: {{fish.shadow_size}}</p>
        <p>Nook's Cranny: {{fish.price_nooks_cranny}} Bells</p>
        <p>C.J: {{fish.price_cj}} Bells</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as _ from "lodash";
import auth from "../services/auth";

export default Vue.extend({
  name: 'Fish',
  data() {
    return {
      fishes: null
    }
  },
  methods: {
    async getAllFish() {
      const response = await auth.getFish();
      let temp = _.sortBy(response.data, "id", "asc");
      this.fishes = temp;
    }
  },
  mounted() {
    this.getAllFish();
  }
})
</script>

<style lang="scss" scoped>
#fish {
  padding: 10px;
  position: relative;
  top: 0;

  h1 {
    color: rgba(28, 26, 31, 1);
    font-family: "Biko Bold";
    font-size: 64px;
    text-shadow: 3px 3px 0px rgba(28, 26, 31, 0.3);
    text-align: center;
  }

  #grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;

    li {
      list-style: none;
      background: lighten(rgb(255, 239, 225), 5%);
      padding: 15px;
      border: 2px solid darken(rgb(255, 239, 225), 5%);
      border-radius: 10px;
      box-shadow: 5px 5px 0px darken(rgb(255, 239, 225), 5%);
    }
  }
}
</style>