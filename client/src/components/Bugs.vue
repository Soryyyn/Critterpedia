<template>
  <GridComponent pageName="Bugs" v-bind:creatures="this.bugs" creatureType="bug"></GridComponent>
</template>

<script lang="ts">
import Vue from 'vue'

import auth from "../services/auth";
import * as _ from "lodash";

import GridComponent from "@/components/GridComponent.vue";

export default Vue.extend({
  name: "Bugs",

  components: {
    "GridComponent": GridComponent
  },

  data() {
    return {
      bugs: [1], // fill it with 1 to fix error
    }
  },

  methods: {

    // get all bugs from api
    getAllBugs() {

      auth.getBugs()
        .then((response) => {
          if (response.data.status == "ok") {
            this.bugs = _.sortBy(response.data.bugs, "id", "asc");
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
    this.getAllBugs();
  }
});
</script>
