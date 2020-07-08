<template>
  <div id="fish">
    <h1>Fish</h1>
    <ul id="grid">
      <li
        v-for="fish in fishes"
        v-bind:key="fish.id"
        v-bind:id="fish.id + '_' + fish.name['name-EUen']"
      >
        <div v-if="loggedIn == true">
          <div v-if="getMarkedAsFavorite(fish.id) != true">
            <a id="unfavorited">
              <i class="far fa-star"></i>
            </a>
          </div>
          <div v-else>
            <a id="favorited">
              <i class="fas fa-star"></i>
            </a>
          </div>

          <div v-if="getMarkedAsCaught(fish.id) != true">
            <a id="uncaught">
              <i class="far fa-bookmark"></i>
            </a>
          </div>
          <div v-else>
            <a id="caught">
              <i class="fas fa-bookmark"></i>
            </a>
          </div>
        </div>

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

// TODO: add fishcard & bugcard for less copy code

import Vue from 'vue';
import * as _ from "lodash";
import auth from "../services/auth";

export default Vue.extend({
  name: 'FishComponent',

  data() {
    return {
      fishes: [],
      favoritesAndCatched: [],
      userId: null,
      loggedIn: false
    }
  },

  methods: {

    // get all fish from api
    async getAllFish() {
      const response = await auth.getFish();
      let temp = _.sortBy(response.data, "id", "asc");

      // @ts-ignore
      this.fishes = temp;
    },

    // convert month to readably names
    getMonths(start: number, end: number) {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return `${months[start]} - ${months[end]}`;
    },

    // check if the wanted fish is favorited
    // in the db by the user
    getMarkedAsFavorite(fishid: any) {
      for (let i = 0; i < this.favoritesAndCatched.length; i++) {
        if (this.fishes[fishid - 1].id == this.favoritesAndCatched[i].fish) {
          if (this.favoritesAndCatched[i].favorited === 1) {
            return true;
          }
        }
      }
    },

    // check if the wanted fish is caught
    // in the db by the user
    getMarkedAsCaught(fishid: any) {
      for (let i = 0; i < this.favoritesAndCatched.length; i++) {
        if (this.fishes[fishid - 1].id == this.favoritesAndCatched[i].fish) {
          if (this.favoritesAndCatched[i].catched === 1) {
            return true;
          }
        }
      }
    },

  },

  // created gets exec before mounted
  // (see vue lifecycle)
  created() {
    this.getAllFish();

    if (this.$session.exists()) {
      this.loggedIn = true;
      this.userId = this.$session.get("userid");
    }
  },

  // mounted gets exec after created
  // (see vue lifecycle)
  async mounted() {
    const response = await auth.getUserFish(this.userId);

    // if the user has saved favorites or catched
    // then load them here into seperate data
    this.favoritesAndCatched = response.data;
  }
})
</script>

<style lang="scss" scoped>
#fish {
  padding: 10px;
  position: relative;
  top: 0;

  h1 {
    font-size: 64px;
    text-align: center;
    margin-bottom: 1.5rem;
    color: rgb(85, 175, 211);
    font-family: "Biko Black";
    text-shadow: 3px 3px 0px darken(rgba(85, 175, 211, 0.3), 30%);
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: darken(rgba(85, 175, 211, 1), 30%);
  }

  #grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin-bottom: 1.5rem;

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
      grid-template-rows: 1fr;
      grid-gap: 15px;

      #unfavorited,
      #favorited {
        position: absolute;
        top: 15px;
        left: 15px;
        font-size: 20px;
        color: rgb(255, 205, 67);
      }

      #uncaught,
      #caught {
        position: absolute;
        top: 45px;
        left: 19px;
        font-size: 20px;
        color: rgb(142, 211, 85);
      }

      #picture-and-more {
        display: flex;
        justify-content: center;
        align-items: center;
        grid-column: 1;
        grid-row: 1;

        img {
          display: block;
          margin-left: auto;
          margin-right: auto;
        }

        .fish-id {
          font-family: "Biko Bold";
          position: absolute;
          top: -28px;
          right: 5px;
          font-size: 200px;
          color: darken(rgba(255, 239, 225, 0.5), 1%);
          z-index: -5;
        }

        div {
          width: 90%;
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
        grid-column: 2;
        grid-row: 1;

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