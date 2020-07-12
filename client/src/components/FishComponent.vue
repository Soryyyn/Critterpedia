<template>
  <div id="fish" v-if="this.loaded">
    <GridComponent
      pageName="Fish"
      v-bind:creatures="this.fishes"
      creatureType="fish"
      v-bind:loggedIn="this.loggedIn"
    ></GridComponent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import auth from "../services/auth";

import GridComponent from "@/components/GridComponent.vue";

export default Vue.extend({
  name: "FishComponent",

  components: {
    "GridComponent": GridComponent
  },

  data() {
    return {
      fishes: [],
      loggedIn: false,
      loaded: false
    }
  },

  methods: {

    // get all fish from api
    getAllFish() {

      auth.getFish()
        .then((response) => {
          if (response.data.status == "ok") {
            // @ts-ignore
            this.fishes = response.data.fish;
            this.loaded = true;
          } else {
            // @ts-ignore
            this.$notify({
              type: "error",
              title: "Error",
              text: response.data.msg,
              duration: 5000
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

    }

  },

  created() {
    this.getAllFish();

    // @ts-ignore
    if (this.$session.exists()) {
      this.loggedIn = true;
    }
  }
});
</script>