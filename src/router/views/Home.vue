<template>
  <div id="home">
    <img id="logo" src="../../assets/critterpedia_icon.png" alt="icon" />

    <h1>
      Welcome to the
      <span id="critterpedia">Critterpedia</span>!
    </h1>

    <h3 id="desc">
      This website helps you with catching all fish & bugs in Animal Crossing: New Horizons
      It shows you which fish & bugs are currently catchable. If you create a login, you can even favorite them and mark them as catched to keep track of your catches.
    </h3>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped lang="scss">
#home {
  // border: 2px solid red;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;

  #logo {
    margin-bottom: 1.5rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 128px;
  }

  h1 {
    color: rgba(28, 26, 31, 1);
    font-family: "Biko Bold";
    font-size: 64px;
    text-shadow: 3px 3px 5px rgba(28, 26, 31, 0.3);
    margin-bottom: 1rem;
    text-align: center;

    #critterpedia {
      color: rgb(255, 205, 67);
      font-family: "Biko Black";
      text-shadow: 3px 3px 5px darken(rgba(255, 205, 67, 0.3), 30%);
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: darken(rgba(255, 205, 67, 1), 30%);
    }
  }

  #desc {
    // border: 2px green solid;
    width: 65%;
    text-align: center;
    color: lighten(rgba(28, 26, 31, 1), 20%);
    font-size: 20px;
    margin: 0 auto;
  }
}
</style>