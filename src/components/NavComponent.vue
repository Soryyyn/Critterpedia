<template>
  <nav>
    <ul>
      <router-link tag="li" to="/home">
        <p>
          <i class="fas fa-home"></i>
          Home
        </p>
      </router-link>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'NavComponent'
})
</script>

<style lang="scss" scoped>
nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  background: darken(rgb(255, 239, 225), 5%);
  box-shadow: 0px 5px 15px darken(rgb(255, 239, 225), 3%);
  padding: 10px;
}

ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: left;
}

ul li {
  padding: 10px;
  background: lighten(rgb(255, 239, 225), 2%);
  position: relative;
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;

  &.router-link-exact-active {
    background: lighten(rgb(255, 239, 225), 5%);
  }

  .fa-home {
    color: rgba(28, 26, 31, 1);
    font-size: 24px;
  }

  p {
    color: rgba(28, 26, 31, 1);
    font-size: 24px;
  }
}

// ul li:last-child {
//   margin-left: auto;
//   margin-right: 20px;
// }
</style>