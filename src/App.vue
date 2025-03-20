<script>
import FooterBottom from './components/elements/FooterBottom.vue';
import NavberMenu from './components/elements/NavberMenu.vue';

export default {
  name: 'App',
  components: {
    NavberMenu, FooterBottom
  }
}
</script>

<template>
  <NavberMenu />
  <router-view />
  <FooterBottom />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
