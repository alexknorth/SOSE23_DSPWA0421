<template>
  <div>
    <UserManager/>
  </div>
</template>

<script>
import UserManager from './components/UserManager.vue';

export default {
  name: 'App',
  components: {
    UserManager
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>