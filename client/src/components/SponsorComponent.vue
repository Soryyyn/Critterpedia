<template>
  <div id="sponsor">
    <div id="wrapper">
      <h1>
        <span id="title">Sponsor</span> ❤️ this project
      </h1>

      <p id="desc">
        I'm looking to keep this project up to date at all times, or maybe as long as the game or the community keep this game alive! If you would like to help me support this project or more of my future projects, it would be awesome if you'd buy me a
        <a
          href="https://www.buymeacoffee.com/soryn"
        >hot chocolate</a> or donate directly through
        <a href="https://www.paypal.me/soryyyn">PayPal</a> to help keep this project free for as many people as possible!
        <br />
        <br />
        <br />
        <b style="color: var(--fontColor) !important">Thank you for using Critterpedia!</b>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "SponsorComponent"
})
</script>

<style lang="scss" scoped>
#sponsor {
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
  margin-top: 10%;
}

h1 {
  font-family: "Biko Bold";
  font-size: 64px;
  color: var(--fontColor);
  text-shadow: 3px 3px 0px var(--fontShadow);
  text-align: center;

  margin-bottom: 1rem;

  #title {
    color: rgb(255, 67, 67);
    font-family: "Biko Black";
    text-shadow: 3px 3px 0px var(--fontShadow);
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: rgb(133, 26, 26);
  }
}

#desc {
  font-family: "Biko Regular";
  color: var(--fontLighterColor);
  font-weight: 200;
  font-size: 24px;
  text-align: center;

  width: 65%;
  margin: 0 auto;
  margin-top: 50px;

  a {
    font-family: "Biko Bold";
    color: var(--mainColor_Light_Scrollbar);
    text-decoration: none;
    transition: 0.1s;

    &:hover {
      text-decoration: underline;
      transition: 0.1s;
    }
  }
}
</style>