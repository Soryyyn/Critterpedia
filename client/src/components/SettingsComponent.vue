<template>
  <div id="settings">
    <div id="wrapper">
      <h1>Settings</h1>

      <form id="settingsForm" @change="checkChange">
        <label for="email">Email</label>
        <input type="text" name="email" v-model="currentSettings.email" />
        <label for="email">Password</label>
        <button id="passwordReset">Reset Password</button>
        <label for="hemisphere">Hemisphere</label>
        <input type="text" name="hemisphere" v-model="currentSettings.hemisphere" />
        <button id="saveChanges">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import auth from "../services/auth";

export default Vue.extend({
  name: "SettingsComponent",

  data() {
    return {
      currentSettings: {
        email: "",
        resetLink: "",
        hemisphere: ""
      },
      originalSettings: {},
      changed: false
    }
  },

  methods: {
    checkChange() {
      // email changes
      if (this.currentSettings.email != this.originalSettings.email) {
        // @ts-ignore
        document.getElementById("settingsForm").elements[0].setAttribute("style", "color: green");
        this.changed = true;
      } else {
        // @ts-ignore
        document.getElementById("settingsForm").elements[0].setAttribute("style", "color: var(--fontColor)");
        this.changed = false;
      }

      // hemisphere changes
      if (this.currentSettings.hemisphere != this.originalSettings.hemisphere) {
        // @ts-ignore
        document.getElementById("settingsForm").elements[2].setAttribute("style", "color: green");
        this.changed = true;
      } else {
        // @ts-ignore
        document.getElementById("settingsForm").elements[2].setAttribute("style", "color: var(--fontColor)");
        this.changed = false;
      }

    }
  },

  created() {

    // @ts-ignore
    auth.getSettings(this.$session.get("userid"))
      .then((response) => {
        if (response.data.status == "ok") {
          this.currentSettings = response.data.settings;
          this.originalSettings = { ...this.currentSettings };
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
})
</script>

<style lang="scss" scoped>
#settings {
  width: 100%;
  height: auto;
  position: relative;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

#wrapper {
  height: 100%;
  width: 50%;
  margin-top: 10%;
}

h1 {
  font-size: 64px;
  text-align: center;

  margin-bottom: 1rem;

  color: rgb(184, 184, 184);
  font-family: "Biko Black";
  text-shadow: 3px 3px 0px rgba(100, 100, 100, 0.2);
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: rgb(100, 100, 100);
}

form {
  display: grid;
  grid-template-columns: 1fr 3fr;
  row-gap: 2rem;

  font-family: "Biko Regular";
  color: var(--fontColor);
  font-size: 22px;

  label {
    font-size: 22px;
    font-family: "Biko Bold";
    opacity: 0.6;

    align-self: center;
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-size: 22px;
    margin-top: 5px;
    font-family: "Biko Regular";
    border: 2px solid darken(rgb(255, 239, 225), 5%);
    border-radius: 10px;
    box-shadow: 5px 5px 0px darken(rgb(255, 239, 225), 5%);
    background: lighten(rgb(255, 239, 225), 5%);
    transition: 0.2s ease-in-out;

    &:focus {
      border: 2px solid darken(rgb(255, 239, 225), 15%);
      box-shadow: 5px 5px 0px darken(rgb(255, 239, 225), 15%);
      outline: none;
      transition: 0.2s ease-in-out;
    }
  }

  button {
    padding: 10px 30px;
    width: 100%;
    font-size: 22px;
    font-family: "Biko Bold";
    border: 2px solid darken(rgb(255, 239, 225), 5%);
    border-radius: 10px;
    box-shadow: 5px 5px 0px darken(rgb(255, 239, 225), 5%);
    background: lighten(rgb(255, 239, 225), 5%);
    transition: 0.2s ease-in-out;
    display: block;

    &:hover {
      transition: 0.2s ease-in-out;
      transform: scale(1.1);
    }

    &:focus {
      border: 2px solid darken(rgb(255, 239, 225), 15%);
      box-shadow: 5px 5px 0px darken(rgb(255, 239, 225), 15%);
      outline: none;
      transition: 0.2s;
    }
  }
}

#saveChanges {
  grid-column-start: 1;
  grid-column-end: 3;
}
</style>