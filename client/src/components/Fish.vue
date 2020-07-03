<template>
  <div id="fish">
    <h1>All Fish</h1>
    <ul id="grid">
      <li
        v-for="fish in this.fishes"
        v-bind:key="fish.id"
        v-bind:id="fish.id + '_' + fish.name['name-EUen']"
      >
        <div id="picture-and-more">
          <div>
            <img v-bind:src="fish.icon_uri" v-bind:alt="fish.name['name-EUen']" />
            <div>
              <p id="fish-name">
                <b>{{fish.name['name-EUen']}}</b>
              </p>
              <p id="fish-catch-phrase">"{{fish['catch-phrase']}}"</p>
            </div>
            <p class="fish-id">#{{fish.id}}</p>
          </div>
        </div>

        <div id="info">
          <div>
            <div v-if="fish.availability.isAllYear == false">
              <p
                class="overlay"
              >North: {{getMonths(fish.availability['month-northern'].split("-")[0], fish.availability['month-northern'].split("-")[1])}}</p>
              <p
                class="overlay"
              >South: {{getMonths(fish.availability['month-southern'].split("-")[0], fish.availability['month-southern'].split("-")[1])}}</p>
            </div>
            <div v-else>
              <p class="overlay">North: All year</p>
              <p class="overlay">South: All year</p>
            </div>

            <div v-if="fish.availability.isAllDay == false">
              <p class="overlay">Time: {{fish.availability.time}}</p>
            </div>
            <div v-else>
              <p class="overlay">Time: All day</p>
            </div>

            <p class="overlay">Location: {{fish.availability.location}}</p>
            <p class="overlay">Rarity: {{fish.availability.rarity}}</p>
            <p class="overlay">Shadow Size: {{fish.shadow}}</p>
            <p class="overlay">Nook's Cranny: {{fish.price}} Bells</p>
            <p class="overlay">C.J: {{fish['price-cj']}} Bells</p>
          </div>
        </div>
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
    },
    getMonths(start: number, end: number) {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return `${months[start]} - ${months[end]}`;
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
    margin-bottom: 1.5rem;
  }

  #grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

    li {
      list-style: none;
      position: relative;
      background: lighten(rgb(255, 239, 225), 5%);
      padding: 15px;
      border: 2px solid darken(rgb(255, 239, 225), 5%);
      border-radius: 10px;
      box-shadow: 5px 5px 0px darken(rgb(255, 239, 225), 5%);
      z-index: 100;
      min-height: 250px;

      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 15px;

      #picture-and-more {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          display: block;
          margin-left: auto;
          margin-right: auto;
        }

        .fish-id {
          font-family: "Biko Bold";
          position: absolute;
          top: 5px;
          right: 20px;
          font-size: 100px;
          color: darken(rgba(255, 239, 225, 0.5), 1%);
          z-index: -5;
        }

        div {
          width: 80%;
          margin-left: auto;
          margin-right: auto;
          font-family: "Biko Regular";

          p {
            text-align: center;
            font-size: 16px;
          }

          p:nth-child(1) {
            text-transform: capitalize;
          }

          p:nth-child(2) {
            margin-top: 2px;
            font-style: italic;
            opacity: 0.6;
          }
        }
      }

      #info {
        display: flex;
        flex-direction: column;
        justify-content: center;

        p {
          font-family: "Biko Regular";
          font-size: 18px;
          padding: 5px;
        }

        .overlay {
          z-index: 101;
        }
      }
    }
  }
}
</style>