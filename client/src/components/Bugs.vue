<template>
  <div id="bugs" v-if="this.loaded">
    <GridComponent
      pageName="Bugs"
      v-bind:creatures="this.bugs"
      creatureType="bug"
      v-bind:loggedIn="this.loggedIn"
    ></GridComponent>
  </div>
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
      bugs: [],
      loggedIn: false,
      loaded: false
    }
  },

  methods: {

    // get all bugs from api
    getAllBugs() {

      auth.getBugs()
        .then((response) => {
          if (response.data.status == "ok") {
            // @ts-ignore
            this.bugs = response.data.bugs;
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
    this.getAllBugs();

    // @ts-ignore
    if (this.$session.exists()) {
      this.loggedIn = true;
    }
  }
});
</script>
