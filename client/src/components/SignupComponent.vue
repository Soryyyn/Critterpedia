<template>
  <div id="signup">
    <h1>
      <span>Sign up</span> for a account
    </h1>
    <div id="wrapper">
      <form>
        <label for="nickname">Nickname</label>
        <input type="text" name="nickname" id="nickname" />
        <label for="email">Email</label>
        <input type="email" name="email" id="email" />
        <label for="password">Password</label>
        <input type="password" name="password" id="password" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "SignupComponent"
})
</script>

<style lang="scss" scoped>
#signup {
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
      margin-bottom: 15px;
      font-family: "Biko Regular";

      border: 2px solid darken(rgb(255, 239, 225), 5%);
      border-radius: 10px;
      box-shadow: 5px 5px 0px darken(rgb(255, 239, 225), 5%);
      background: lighten(rgb(255, 239, 225), 5%);
    }
  }
}
</style>