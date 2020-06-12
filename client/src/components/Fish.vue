<template>
  <div id="fish"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import auth from "../services/auth";

export default Vue.extend({
  name: 'Fish',
  methods: {
    async getAllFish() {
      const response = await auth.getFish();

      console.log(response.data);
    }
  },
  mounted() {
    this.getAllFish();
  }
})
</script>