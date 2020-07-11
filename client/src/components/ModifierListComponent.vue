<template>
  <div id="modifierList">
    <div v-if="!isFavorited">
      <a id="unfavorited" v-on:click="flipFavorited()">
        <i class="far fa-star"></i>
      </a>
    </div>
    <div v-else>
      <a id="favorited" v-on:click="flipFavorited()">
        <i class="fas fa-star"></i>
      </a>
    </div>

    <div v-if="!isCaught">
      <a id="uncaught" v-on:click="flipCaught()">
        <i class="far fa-bookmark"></i>
      </a>
    </div>
    <div v-else>
      <a id="caught" v-on:click="flipCaught()">
        <i class="fas fa-bookmark"></i>
      </a>
    </div>

    <!-- <div v-if="seeIfAvailable(creature.id) != true">
      <a id="unavailable">
        <i class="far fa-clock"></i>
      </a>
    </div>
    <div v-else>
      <a id="available">
        <i class="fas fa-clock"></i>
      </a>
    </div>-->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import auth from "../services/auth";

export default Vue.extend({
  name: "ModifierListComponent",

  props: [
    "creature",
    "creatureType"
  ],

  data() {
    return {
      isSaved: false,
      isCaught: false,
      isFavorited: false
    }
  },

  methods: {

    flipFavorited() {
      if (this.isFavorited) {
        this.isFavorited = false;

        this.$notify({
          type: "favorite",
          title: 'Not favorited anymore!',
          text: `<b style="text-transform: capitalize;">${this.creature.name['name-EUen']}</b> is not favorited anymore!`,
          duration: 2000
        });
      } else {
        this.isFavorited = true;

        this.$notify({
          type: "favorite",
          title: 'Favorited!',
          text: `<b style="text-transform: capitalize;">${this.creature.name['name-EUen']}</b> has been favorited!`,
          duration: 2000
        });
      }

      let changes = {
        // @ts-ignore
        userId: this.$session.get("userid"),
        fish: this.creature.id,
        caught: this.isCaught,
        favorited: this.isFavorited
      }

      if (this.creatureType == "fish") {

        auth.postChangeToUserFish(changes)
          .then((response) => {
            if (response.data.status != "ok") {
              // @ts-ignore
              this.$notify({
                type: "error",
                title: "Error",
                text: response.data.msg,
                duration: 5000
              });
            }

            console.log(response.data);

          })
          .catch((err) => {
            console.log(err);
          });

      } else if (this.creatureType == "bug") {

        auth.postChangeToUserBugs(changes)
          .then((response) => {
            if (response.data.status != "ok") {
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

    flipCaught() {
      if (this.isCaught) {
        this.isCaught = false;

        // @ts-ignore
        this.$notify({
          type: "catching",
          title: 'Not catched anymore!',
          text: `<b style="text-transform: capitalize;">${this.creature.name['name-EUen']}</b> is catched anymore!`,
          duration: 2000
        });
      } else {
        this.isCaught = true;

        this.$notify({
          type: "catching",
          title: 'Catched!',
          text: `<b style="text-transform: capitalize;">${this.creature.name['name-EUen']}</b> has been caught!`,
          duration: 2000
        });
      }

      let changes = {
        // @ts-ignore
        userId: this.$session.get("userid"),
        fish: this.creature.id,
        caught: this.isCaught,
        favorited: this.isFavorited
      }

      if (this.creatureType == "fish") {

        auth.postChangeToUserFish(changes)
          .then((response) => {
            if (response.data.status != "ok") {
              // @ts-ignore
              this.$notify({
                type: "error",
                title: "Error",
                text: response.data.msg,
                duration: 5000
              });
            }

            console.log(response.data);

          })
          .catch((err) => {
            console.log(err);
          });

      } else if (this.creatureType == "bug") {

        auth.postChangeToUserBugs(changes)
          .then((response) => {
            if (response.data.status != "ok") {
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

    }

  },

  created() {

    // check if creature is saved
    if (this.creatureType == "fish") {

      // @ts-ignore
      auth.getUserFish(this.$session.get("userid"))
        .then((response) => {

          if (response.data.fish.length > 0) {
            for (let i = 0; i < response.data.fish.length; i++) {
              if (response.data.fish[i].fish == this.creature.id) {
                this.isSaved = true;
                this.isCaught = response.data.fish[i].caught;
                this.isFavorited = response.data.fish[i].favorited;
              }
            };
          }

        })
        .catch((err) => {
          console.log(err);
        });

    } else if (this.creatureType == "bug") {

      // @ts-ignore
      auth.getUserBugs(this.$session.get("userid"))
        .then((response) => {

          if (response.data.bugs.length > 0) {
            for (let i = 0; i < response.data.bugs.length; i++) {
              if (response.data.bugs[i].bug == this.creature.id) {
                this.isSaved = true;
                this.isCaught = response.data.fish[i].caught;
                this.isFavorited = response.data.fish[i].favorited;
              }
            };
          }

        })
        .catch((err) => {
          console.log(err);
        });

    }

  }

})
</script>

<style lang="scss" scoped>
#modifierList {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 5px;
  left: 5px;
  padding: 10px;
}

#unfavorited,
#favorited {
  font-size: 20px;
  color: rgb(255, 205, 67);
  transition: 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &:active {
    transition: 0.1s ease-in-out;
    color: lighten(rgb(255, 205, 67), 20%);
  }
}

#uncaught,
#caught {
  font-size: 20px;
  color: rgb(142, 211, 85);
  transition: 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &:active {
    transition: 0.1s ease-in-out;
    color: lighten(rgb(142, 211, 85), 20%);
  }
}
</style>