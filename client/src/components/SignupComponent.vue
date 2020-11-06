<template>
  <div id="signup">
    <div id="wrapper">
      <h1>
        <span>Sign up</span> for an account
      </h1>

      <form @submit.prevent="signupUser()">
        <label for="nickname">Nickname</label>
        <input type="text" name="nickname" id="nickname" v-model="nickname" placeholder="Steve" />
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

        <label>
          Hemisphere
          <i>(changeable later)</i>
        </label>

        <select v-model="hemisphere">
          <option value selected disabled hidden>Select an Option</option>
          <option value="northern" selected>Northern</option>
          <option value="southern">Southern</option>
        </select>

        <button id="signup_button">Sign up</button>
        <p id="signin">
          or sign in
          <router-link :to="{ name: 'Signin'}">here</router-link>
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
  name: "SignupComponent",
  data() {
    return {
      nickname: "",
      email: "",
      password: "",
      hemisphere: ""
    }
  },
  methods: {
    signupUser() {
      let salt = bcrypt.genSaltSync();

      if (this.nickname.length != 0 && this.email.length != 0 && this.password.length != 0 && this.hemisphere.length) {

        let newUser = {
          nickname: this.nickname,
          email: this.email,
          password: bcrypt.hashSync(this.password, salt),
          hemisphere: this.hemisphere
        }

        // start session and save nickname of user
        // move user to previous route(fish, bugs, etc.)
        auth.postSignup(newUser)
          .then((response) => {
            if (response.data.status == "ok") {
              // // @ts-ignore
              this.$session.start();
              // // @ts-ignore
              this.$session.set("userid", response.data.user._id);
              // // @ts-ignore
              this.$session.set("hemisphere", response.data.user.hemisphere);
              // @ts-ignore
              this.$router.push({ name: 'Home' })
              window.location.reload()
              // @ts-ignore
              // this.$notify({
              //   type: "catching",
              //   title: "Authentication needed",
              //   text: "I've sent you a email, please press the link in said email to authenticate your account",
              //   duration: 8000
              // });
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

      } else {
        // @ts-ignore
        this.$notify({
          type: "error",
          title: "Error",
          text: "Not all fields are set",
          duration: 5000
        });
      }
    }
  }
})
</script>

<style lang="scss" scoped>
#signup {
  width: 100%;
  height: auto;
  position: relative;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
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
  height: 100%;
  margin-top: 2rem;
}

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

  .smaller {
    font-size: 18px;
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

  #signup_button {
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

  #signin {
    font-family: "Biko Regular";
    text-align: center;
    margin-top: 25px;
    font-size: 22px;

    a {
      color: rgb(85, 175, 211);
    }
  }
}

select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: none;

  margin-bottom: 25px;
  padding: 10px;
  font-family: "Biko Regular";
  font-size: 22px;
  width: 100%;
  box-sizing: border-box;

  border: 2px solid darken(rgb(255, 239, 225), 5%);
  border-radius: 10px;
  box-shadow: 5px 5px 0px darken(rgb(255, 239, 225), 5%);
  background: lighten(rgb(255, 239, 225), 5%);
  transition: 0.2s ease-in-out;
  outline: none;

  &:focus {
    border: 2px solid darken(rgb(255, 239, 225), 15%);
    box-shadow: 5px 5px 0px darken(rgb(255, 239, 225), 15%);
    outline: none;
    transition: 0.2s ease-in-out;
  }
}

@media screen and (min-width: 451px) and (max-width: 1200px) {
  #wrapper {
    margin-top: 1rem;
  }
}

// phones
@media screen and (max-width: 450px) {
  #wrapper {
    margin-top: 1rem;
  }

  h1 {
    font-size: 48px;
    line-height: 90%;
  }

  form {
    label {
      font-size: 18px;
      font-family: "Biko Bold";
      opacity: 0.6;
    }
  }
}
</style>