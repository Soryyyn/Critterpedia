<template>
  <div id="Bugs">
    <h1>Bugs</h1>
    <ul id="grid">
      <li
        v-for="bug in this.bugs"
        v-bind:key="bug.id"
        v-bind:id="bug.id + '_' + bug.name['name-EUen']"
      >
        <div id="icon-wrapper" v-if="loggedIn == true">
          <div v-if="getMarkedAsFavorite(bug.id) != true">
            <a id="unfavorited" v-on:click="markAsFavorited(bug.id)">
              <i class="far fa-star"></i>
            </a>
          </div>
          <div v-else>
            <a id="favorited" v-on:click="markAsUnfavorited(bug.id)">
              <i class="fas fa-star"></i>
            </a>
          </div>

          <div v-if="getMarkedAsCaught(bug.id) != true">
            <a id="uncaught" v-on:click="markAsCaught(bug.id)">
              <i class="far fa-bookmark"></i>
            </a>
          </div>
          <div v-else>
            <a id="caught" v-on:click="markAsUncaught(bug.id)">
              <i class="fas fa-bookmark"></i>
            </a>
          </div>

          <div v-if="seeIfAvailable(bug.id) != true">
            <a id="unavailable">
              <i class="far fa-clock"></i>
            </a>
          </div>
          <div v-else>
            <a id="available">
              <i class="fas fa-clock"></i>
            </a>
          </div>
        </div>

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

            <div v-if="bug.availability.location != ''">
              <p class="overlay">Location: {{bug.availability.location}}</p>
            </div>
            <div v-else>
              <p class="overlay">
                Location:
                <i>Location not defined</i>
              </p>
            </div>
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
import * as moment from "moment";

export default Vue.extend({
  name: 'BugsComponent',
  data() {
    return {
      bugs: [],
      favoritesAndCatched: [],
      available: [],
      userId: null,
      loggedIn: false
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
    },

    // check if the wanted fish is favorited
    // in the db by the user
    getMarkedAsFavorite(bugid: any) {
      for (let i = 0; i < this.favoritesAndCatched.length; i++) {
        if (this.bugs[bugid - 1].id == this.favoritesAndCatched[i].bug) {
          if (this.favoritesAndCatched[i].favorited === 1) {
            return true;
          }
        }
      }
    },

    // check if the wanted fish is caught
    // in the db by the user
    getMarkedAsCaught(bugid: any) {
      for (let i = 0; i < this.favoritesAndCatched.length; i++) {
        if (this.bugs[bugid - 1].id == this.favoritesAndCatched[i].bug) {
          if (this.favoritesAndCatched[i].catched === 1) {
            return true;
          }
        }
      }
    },

    // catch the clicked icon of fish
    markAsCaught(bugid) {
      let favorited;
      if (this.getMarkedAsFavorite(bugid) === true) {
        favorited = 1;
      } else {
        favorited = 0;
      }

      let newChanges = {
        userid: this.userId,
        bug: bugid,
        favorited: favorited,
        catched: 1
      }

      this.saveChanges(newChanges);
      this.$notify({
        type: "catching",
        title: 'Catched!',
        text: `<b style="text-transform: capitalize;">${this.bugs[bugid - 1].name['name-EUen']}</b> has been caught!`,
        duration: 2000
      });
    },

    // uncatch the clicked icon of fish
    markAsUncaught(bugid) {
      let favorited;
      if (this.getMarkedAsFavorite(bugid) === true) {
        favorited = 1;
      } else {
        favorited = 0;
      }

      let newChanges = {
        userid: this.userId,
        bug: bugid,
        favorited: favorited,
        catched: 0
      }

      this.saveChanges(newChanges);
      this.$notify({
        type: "catching",
        title: 'Not catched anymore!',
        text: `<b style="text-transform: capitalize;">${this.bugs[bugid - 1].name['name-EUen']}</b> is catched anymore!`,
        duration: 2000
      });
    },

    // favorite the clicked icon of fish
    markAsFavorited(bugid) {
      let caught;
      if (this.getMarkedAsCaught(bugid) === true) {
        caught = 1;
      } else {
        caught = 0;
      }

      let newChanges = {
        userid: this.userId,
        bug: bugid,
        favorited: 1,
        catched: caught
      }

      this.saveChanges(newChanges);
      this.$notify({
        type: "favorite",
        title: 'Favorited!',
        text: `<b style="text-transform: capitalize;">${this.bugs[bugid - 1].name['name-EUen']}</b> has been favorited!`,
        duration: 2000
      });
    },

    // unfavorite the clicked icon of fish
    markAsUnfavorited(bugid) {
      let caught;
      if (this.getMarkedAsCaught(bugid) === true) {
        caught = 1;
      } else {
        caught = 0;
      }

      let newChanges = {
        userid: this.userId,
        bug: bugid,
        favorited: 0,
        catched: caught
      }

      this.saveChanges(newChanges);
      this.$notify({
        type: "favorite",
        title: 'Not favorited anymore!',
        text: `<b style="text-transform: capitalize;">${this.bugs[bugid - 1].name['name-EUen']}</b> is not favorited anymore!`,
        duration: 2000
      });
    },

    // first change saves to current session and then
    // save changes to db
    async saveChanges(changes) {
      let toChange = null;
      for (let i = 0; i < this.favoritesAndCatched.length; i++) {

        // if there is already an entry in local list or db
        if (this.favoritesAndCatched[i].user == this.userId && this.favoritesAndCatched[i].bug == changes.bug) {
          toChange = i;
        }

      }

      if (toChange != null) {
        this.favoritesAndCatched[toChange].user = changes.userid;
        this.favoritesAndCatched[toChange].bug = changes.bug;
        this.favoritesAndCatched[toChange].catched = changes.catched;
        this.favoritesAndCatched[toChange].favorited = changes.favorited;

        auth.postChangeToUserBugs(changes);
      } else {
        this.favoritesAndCatched.push({
          user: changes.userid,
          bug: changes.bug,
          catched: changes.catched,
          favorited: changes.favorited
        });

        auth.postChangeToUserBugs(changes);
      }
    },

    // check if current bug is available and return to show
    // as clock icon
    seeIfAvailable(bugid) {
      for (let i = 0; i < this.available.length; i++) {
        if (this.available[i] == bugid) {
          return true;
        }
      }
    }

  },

  // created gets exec before mounted
  // (see vue lifecycle)
  created() {
    this.getAllBugs();

    if (this.$session.exists()) {
      this.loggedIn = true;
      this.userId = this.$session.get("userid");
    }

    // check every minute if bug is currently catchable
    setInterval(() => {
      this.available = [];
      let currentHour = moment().format("H");

      for (let i = 0; i < this.bugs.length; i++) {
        if (!this.bugs[i].availability.isAllDay) {
          for (let j = 0; j < this.bugs[i].availability["time-array"].length; j++) {
            if (this.bugs[i].availability["time-array"][j] == currentHour) {
              // if bug is currently available add array id to list
              // to check in template
              this.available.push(this.bugs[i].id);
              break;
            }
          }
        } else {
          // add it to available list if it is available all day
          this.available.push(this.bugs[i].id);
        }
      }
    }, 1000);
  },

  // mounted gets exec after created
  // (see vue lifecycle)
  async mounted() {
    const response = await auth.getUserBugs(this.userId);

    // if the user has saved favorites or catched
    // then load them here into seperate data
    this.favoritesAndCatched = response.data;
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
      grid-template-rows: 1fr;
      grid-row-gap: 0px;
      grid-column-gap: 15px;

      #icon-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 15px;
        left: 15px;

        #unfavorited,
        #favorited {
          font-size: 20px;
          color: rgb(255, 205, 67);
          transition: 0.1 ease-in-out;

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
          transition: 0.1 ease-in-out;

          &:hover {
            cursor: pointer;
          }

          &:active {
            transition: 0.1s ease-in-out;
            color: lighten(rgb(142, 211, 85), 20%);
          }
        }

        #unavailable,
        #available {
          font-size: 20px;
          color: rgb(85, 175, 211);
          transition: 0.1 ease-in-out;
        }
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