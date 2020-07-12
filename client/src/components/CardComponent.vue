<template>
  <div id="card">
    <div v-if="loggedIn == true">
      <ModifierListComponent :creatureType="creatureType" :creature="creature" v-if="creature"></ModifierListComponent>
    </div>

    <div id="picture-and-more">
      <div>
        <img v-bind:src="creature.icon_uri" />
        <div>
          <p id="name">{{ creature.name && creature.name['name-EUen']}}</p>
          <p id="catch-phrase">"{{creature['catch-phrase']}}"</p>
        </div>
        <p id="number">#{{creature.id}}</p>
      </div>
    </div>

    <div id="info">
      <!-- months -->
      <div v-if="creature.availability && creature.availability.isAllYear == false">
        <p class="overlay">North: {{getMonths(creature.availability['month-northern'])}}</p>
        <p class="overlay">South: {{getMonths(creature.availability['month-southern'])}}</p>
      </div>
      <div v-else>
        <p class="overlay">North: All year</p>
        <p class="overlay">South: All year</p>
      </div>

      <!-- time -->
      <div v-if="creature.availability && creature.availability.isAllDay == false">
        <p class="overlay">Time: {{creature.availability.time}}</p>
      </div>
      <div v-else>
        <p class="overlay">Time: All day</p>
      </div>

      <!-- location -->
      <div v-if="creature.availability && creature.availability.location != ''">
        <p class="overlay">Location: {{creature.availability.location}}</p>
      </div>
      <div v-else>
        <p class="overlay">
          Location:
          <i>Location not defined</i>
        </p>
      </div>

      <!-- rarity -->
      <p class="overlay">Rarity: {{creature.availability && creature.availability.rarity}}</p>

      <!-- shadow (only fish) -->
      <div v-if="creature.shadow != undefined">
        <p class="overlay">Shadow Size: {{creature && creature.shadow}}</p>
      </div>

      <!-- price nooks cranny -->
      <p class="overlay">Nook's Cranny: {{creature && creature.price}} Bells</p>

      <!-- price cj or flick or other if added -->
      <div v-if="creatureType == 'fish'">
        <p class="overlay">C.J: {{creature['price-cj']}} Bells</p>
      </div>
      <div v-else-if="creatureType == 'bug'">
        <p class="overlay">Flick: {{creature['price-flick']}} Bells</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import ModifierListComponent from "@/components/ModifierListComponent.vue";

export default Vue.extend({
  name: "CardComponent",

  props: [
    "creature",
    "creatureType",
    "loggedIn"
  ],

  components: {
    "ModifierListComponent": ModifierListComponent
  },

  methods: {

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
    },

  }
})
</script>

<style lang="scss" scoped>
#card {
  list-style: none;
  position: relative;
  background: var(--mainColor_Light_Lighter);
  padding: 15px;
  border: 2px solid var(--mainColor_Light_Accent);
  border-radius: 10px;
  box-shadow: 5px 5px 0px var(--mainColor_Light_Accent);
  z-index: 100;
  min-height: 300px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-row-gap: 0px;
  grid-column-gap: 15px;
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

  #number {
    font-family: "Biko Bold";
    position: absolute;
    bottom: 0;
    right: 15px;
    font-size: 54px;
    color: var(--mainColor_Light_CardNumber);
    z-index: -5;
  }

  div {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    font-family: "Biko Regular";

    p {
      text-align: center;
      font-size: 18px;
    }

    p:nth-child(1) {
      text-transform: capitalize;
    }

    p:nth-child(2) {
      font-size: 16px;
      margin-top: 2px;
      font-style: italic;
      color: var(--fontLighterColor);
      opacity: 0.6;
      letter-spacing: 0.2px;
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
    color: var(--fontColor);
  }

  .overlay {
    z-index: 101;
  }
}
</style>
