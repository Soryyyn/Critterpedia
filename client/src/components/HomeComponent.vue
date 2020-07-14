<template>
  <div id="home">
    <div id="wrapper">
      <img id="logo" src="@/assets/critterpedia_icon.png" alt="icon" />

      <h1>
        Welcome to the
        <span id="critterpedia">Critterpedia</span>!
      </h1>

      <h3 id="desc">
        This website helps you with catching all fish & bugs in
        <br />Animal Crossing: New Horizons.
        <br />
        <br />It shows you which fish & bugs are currently catchable. If you create a login, you can even favorite them and mark them as catched to keep track of your catches.
      </h3>

      <div id="dev-links">
        <div id="twitter" @click="openTwitter()">
          <i class="fab fa-twitter"></i>
        </div>
        <div id="github" @click="openGithub()">
          <i class="fab fa-github"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'



export default Vue.extend({
  name: "HomeComponent",

  methods: {

    openTwitter() {
      window.open('https://twitter.com/dev_soryn');
    },

    openGithub() {
      window.open('https://github.com/Soryyyn');
    }

  }
})
</script>

<style scoped lang="scss">
#home {
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

#logo {
  display: block;
  width: 128px;

  margin-bottom: 1.5rem;
  margin-left: auto;
  margin-right: auto;
}

h1 {
  font-family: "Biko Bold";
  font-size: 64px;
  color: var(--fontColor);
  text-shadow: 3px 3px 0px var(--fontShadow);
  text-align: center;

  margin-bottom: 1rem;

  #critterpedia {
    color: var(--yellowTitle);
    font-family: "Biko Black";
    text-shadow: 3px 3px 0px var(--fontShadow);
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: darken(rgba(255, 205, 67, 1), 30%);
  }
}

#desc {
  font-family: "Biko Regular";
  letter-spacing: 1px;
  color: var(--fontLighterColor);
  font-size: 20px;
  text-align: center;

  width: 65%;
  margin: 0 auto;
}

#dev-links {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    background: var(--mainColor_Light_Lighter);
    box-shadow: 5px 5px 0px var(--mainColor_Light_Accent);
    border: 2px solid var(--mainColor_Light_Accent);
    padding: 10px;
    font-size: 24px;
    border-radius: 24px;
    margin: 1rem 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    &:hover {
      transition: 0.1s ease-in-out;
      transform: scale(1.1);
    }

    &:active {
      border: 2px solid var(--mainColor_Light_Active);
      box-shadow: 5px 5px 0px var(--mainColor_Light_Active);
    }

    i {
      transition: 0.05s ease-in-out;
    }
  }
}

#github:active {
  transition: 0.05s ease-in-out;
  color: var(--fontLighterColor);
}

#twitter:active {
  transition: 0.05s ease-in-out;
  color: var(--fishTitleColor);
}

// smaller (ipads, etc)
@media screen and (min-width: 451px) and (max-width: 1200px) {
  #wrapper {
    height: 100%;
    margin-top: 10%;
  }

  #logo {
    width: 100px;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 46px;
  }

  #desc {
    font-size: 18px;
  }

  #dev-links {
    div {
      font-size: 20px;
    }
  }
}

// phones
@media screen and (max-width: 450px) {
  #wrapper {
    height: 100%;
    margin-top: 10%;
  }

  #logo {
    width: 110px;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 40px;
  }

  #desc {
    font-size: 18px;
  }
}
</style>