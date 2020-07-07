<template>
  <div id="Bugs">
    <h1>Bugs</h1>
    <ul id="grid">
      <li
        v-for="bug in this.bugs"
        v-bind:key="bug.id"
        v-bind:id="bug.id + '_' + bug.name['name-EUen']"
      >
        <div id="picture-and-more">
          <div>
            <img v-bind:src="bug.icon_uri" v-bind:alt="bug.name['name-EUen']" />
            <div>
              <p id="bug-name">
                <b>{{bug.name['name-EUen']}}</b>
              </p>
              <p id="bug-catch-phrase">"{{bug['catch-phrase']}}"</p>
            </div>
            <p class="bug-id">#{{bug.id}}</p>
          </div>
        </div>

        <div id="info">
          <div>
            <div v-if="bug.availability.isAllYear == false">
              <p class="overlay">North: {{getMonths(bug.availability['month-northern'])}}</p>
              <p class="overlay">South: {{getMonths(bug.availability['month-southern'])}}</p>
            </div>
            <div v-else>
              <p class="overlay">North: All year</p>
              <p class="overlay">South: All year</p>
            </div>

            <div v-if="bug.availability.isAllDay == false">
              <p class="overlay">Time: {{bug.availability.time}}</p>
            </div>
            <div v-else>
              <p class="overlay">Time: All day</p>
            </div>

            <p class="overlay">Location: {{bug.availability.location}}</p>
            <p class="overlay">Rarity: {{bug.availability.rarity}}</p>
            <p class="overlay">Nook's Cranny: {{bug.price}} Bells</p>
            <p class="overlay">Flick: {{bug['price-flick']}} Bells</p>
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
  name: 'BugsComponent',
  data() {
    return {
      bugs: []
    }
  },
  methods: {
    async getAllBugs() {
      const response = await auth.getBugs();
      let temp = _.sortBy(response.data, "id", "asc");

      // @ts-ignore
      this.bugs = temp;
    },
    getMonths(range: string) {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let temp = range.split("&");
      if (temp.length == 1) {
        if (temp[0].split("-")[1] != undefined) {
          return `${months[parseInt(temp[0].split("-")[0]) - 1]} - ${months[parseInt(temp[0].split("-")[1]) - 1]}`;
        } else {
          return `${months[parseInt(temp[0].split("-")[0]) - 1]}`
        }
      } else {
        return `${months[parseInt(temp[0].split("-")[0]) - 1]} - ${months[parseInt(temp[0].split("-")[1]) - 1]} & ${months[parseInt(temp[1].split("-")[0]) - 1]} - ${months[parseInt(temp[1].split("-")[1]) - 1]}`;
      }
    }
  },
  mounted() {
    this.getAllBugs();
  }
})
</script>

<style lang="scss" scoped>
#Bugs {
  padding: 10px;
  position: relative;
  top: 0;

  h1 {
    font-size: 64px;
    text-align: center;
    margin-bottom: 1.5rem;
    color: rgb(142, 211, 85);
    font-family: "Biko Black";
    text-shadow: 3px 3px 0px darken(rgba(142, 211, 85, 0.3), 30%);
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: darken(rgba(142, 211, 85, 1), 30%);
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

        .bug-id {
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