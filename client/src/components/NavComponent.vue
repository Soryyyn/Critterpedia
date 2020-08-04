<template>
  <nav>
    <ul>
      <router-link tag="li" :to="{ name: 'Home'}">
        <i class="fas fa-home"></i>
        <p>Home</p>
      </router-link>
      <router-link tag="li" :to="{ name: 'Fish'}">
        <i class="fas fa-fish"></i>
        <p>Fish</p>
      </router-link>
      <router-link tag="li" :to="{ name: 'Bugs'}">
        <i class="fas fa-bug"></i>
        <p>Bugs</p>
      </router-link>
      <router-link tag="li" id="sponsor-button" :to="{ name: 'Sponsor'}">
        <i class="fas fa-heart"></i>
        <p>Sponsor</p>
      </router-link>
      <router-link tag="li" :to="{ name: 'Signin'}">
        <i class="fas fa-user"></i>
      </router-link>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'NavComponent',

  methods: {

  }
})
</script>

<style lang="scss" scoped>
nav {
  position: relative;
  top: 0;
  left: 0;
  padding: 10px;
  margin-bottom: 1.5rem;
}

ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: left;
}

ul li {
  padding: 10px;
  background: var(--mainColor_Light_Lighter);
  position: relative;
  border: 2px solid var(--mainColor_Light_Accent);
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 5px 5px 0px var(--mainColor_Light_Accent);
  transition: 0.1s ease-in-out;
  color: rgba(28, 26, 31, 1);
  font-size: 20px;
  font-family: "Biko Bold";
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: left;

  &:not(:first-child):not(:last-child) {
    margin-left: 10px;
  }

  &:last-child {
    margin-left: auto;
  }

  &.router-link-exact-active {
    border: 2px solid var(--mainColor_Light_Active);
    box-shadow: 5px 5px 0px var(--mainColor_Light_Active);
  }

  &:hover {
    transition: 0.1s ease-in-out;
    transform: scale(1.1);
  }

  .fa-home,
  .fa-fish,
  .fa-bug,
  .fa-user,
  .fa-heart {
    color: var(--fontColor);
    font-size: 20px;
    margin-right: 5px;
    vertical-align: middle;
  }

  .fa-user {
    margin-left: 2px;
    margin-right: 2px;
  }
}

#sponsor-button {
  background: rgb(255, 219, 219);
  border: 2px solid rgb(255, 189, 189);
  box-shadow: 5px 5px 0px rgb(255, 189, 189);
  color: rgb(204, 65, 65);

  i {
    color: rgb(204, 65, 65);
  }

  &:hover {
    border: 2px solid rgb(255, 158, 158);
    box-shadow: 5px 5px 0px rgb(255, 158, 158);
  }
}

@media screen and (max-width: 450px) {
  ul li {
    .fa-home,
    .fa-fish,
    .fa-bug,
    .fa-user {
      margin-right: 0 !important;
      font-size: 24px !important;
    }

    p {
      text-indent: 100%;
      white-space: nowrap;
      overflow: hidden;
      font-size: 0;
    }
  }
}
</style>