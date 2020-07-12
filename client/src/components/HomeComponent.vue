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
    </div>

    <footer>yeet</footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "HomeComponent"
})
</script>

<style scoped lang="scss">
// #home {
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   position: absolute;

//   #logo {
//     display: block;
//     width: 128px;

//     margin-bottom: 1.5rem;
//     margin-left: auto;
//     margin-right: auto;
//   }

//   h1 {
//     font-family: "Biko Bold";
//     font-size: 64px;
//     color: var(--fontColor);
//     text-shadow: 3px 3px 0px var(--fontShadow);
//     text-align: center;

//     margin-bottom: 1rem;

//     #critterpedia {
//       color: var(--yellowMain);
//       font-family: "Biko Black";
//       text-shadow: 3px 3px 0px var(--yellowShadow);
//       -webkit-text-stroke-width: 2px;
//       -webkit-text-stroke-color: var(--yellowAccent);
//     }
//   }

//   #desc {
//     font-family: "Biko Regular";
//     letter-spacing: 1px;
//     color: var(--fontLighterColor);
//     font-size: 20px;
//     text-align: center;

//     width: 65%;
//     margin: 0 auto;
//   }
// }

// footer {
//   width: 100%;
//   background: red;
// }

#home {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
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
    color: var(--yellowMain);
    font-family: "Biko Black";
    text-shadow: 3px 3px 0px var(--yellowShadow);
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: var(--yellowAccent);
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

footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: red;
  padding: 10px;
  box-sizing: border-box;
}
</style>