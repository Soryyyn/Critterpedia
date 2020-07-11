<template>
  <GridComponent
    pageName="Fish"
    v-bind:creatures="this.fishes"
    creatureType="fish"
    v-bind:loggedIn="this.loggedIn"
  ></GridComponent>
</template>

<script lang="ts">
import Vue from 'vue'

import auth from "../services/auth";
import * as _ from "lodash";

import GridComponent from "@/components/GridComponent.vue";

export default Vue.extend({
  name: "Fish",

  components: {
    "GridComponent": GridComponent
  },

  data() {
    return {
      fishes: [],
      loggedIn: false
    }
  },

  methods: {

    // get all fish from api
    getAllFish() {

      auth.getFish()
        .then((response) => {
          if (response.data.status == "ok") {
            this.fishes = _.sortBy(response.data.fish, "id", "asc");
          } else {
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

    if (this.$session.exists()) {
      this.loggedIn = true;
    }
  }
});
</script>
