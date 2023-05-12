<template>
  <div>
    <UserManager msg="Benutzerverwaltung"/>
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
