<template>
  <div id="signin">
    <h1>
      <span>Sign in</span> to an account
    </h1>
    <div id="wrapper">
      <form @submit.prevent="signinUser()">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model="email"
          placeholder="steve.bobs@gmail.com"
        />
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          placeholder="tr33-Branch"
        />
        <button id="signin_button" type="submit">Sign in</button>
        <p id="signup">
          or sign up
          <router-link :to="{ name: 'Signup'}">here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as bcrypt from "bcryptjs";
import auth from "../services/auth";

export default Vue.extend({
  name: "SigninComponent",
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    signinUser() {
      let salt = bcrypt.genSaltSync();


      let user = {
        email: this.email,
        password: this.password
      }

      if (user.password != "" || user.password != undefined) {

        auth.postSignin(user)
          .then((response) => {

            if (response.data.status == "ok") {
              if (bcrypt.compareSync(user.password, response.data.user.password)) {
                //   start session and save nickname of user
                // move user to previous route (fish, bugs, etc.)
                this.$session.start();
                this.$session.set("userid", response.data.user._id);
                this.$session.set("hemisphere", response.data.user.hemisphere);
                this.$router.push({ name: 'Home' })
              } else {
                this.$notify({
                  type: "error",
                  title: 'Error on sign in',
                  text: "Password not valid",
                  duration: 5000
                });
              }
            } else {
              this.$notify({
                type: "error",
                title: 'Error on sign in',
                text: response.data.msg,
                duration: 5000
              });
            }

          })
          .catch((err) => {
            console.log(err);
          })
      }

    }

  }
})
</script>

<style lang="scss" scoped>
#signin {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

h1 {
  color: rgba(28, 26, 31, 1);
  font-family: "Biko Bold";
  font-size: 64px;
  text-shadow: 3px 3px 0px rgba(28, 26, 31, 0.3);
  margin-bottom: 1rem;
  text-align: center;

  span {
    color: rgb(255, 205, 67);
    font-family: "Biko Black";
    text-shadow: 3px 3px 0px darken(rgba(255, 205, 67, 0.3), 30%);
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: darken(rgba(255, 205, 67, 1), 30%);
  }
}

#wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 2rem;

  form {
    display: table;
    margin-left: auto;
    margin-right: auto;
    width: 80%;

    label,
    input {
      display: table-row;
    }

    label {
      font-size: 22px;
      font-family: "Biko Bold";
      opacity: 0.6;
    }

    input {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      font-size: 22px;
      margin-top: 5px;
      margin-bottom: 25px;
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

    #signin_button {
      padding: 10px 30px;
      font-size: 22px;
      font-family: "Biko Bold";
      border: 2px solid darken(rgb(255, 239, 225), 5%);
      border-radius: 10px;
      box-shadow: 5px 5px 0px darken(rgb(255, 239, 225), 5%);
      background: lighten(rgb(255, 239, 225), 5%);
      transition: 0.2s ease-in-out;
      display: block;
      margin: 0 auto;

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

    #signup {
      font-family: "Biko Regular";
      text-align: center;
      margin-top: 25px;
      font-size: 22px;

      a {
        color: rgb(85, 175, 211);
      }
    }
  }
}
</style>