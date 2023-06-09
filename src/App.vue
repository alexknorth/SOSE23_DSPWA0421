<template>
  <div>
    <UserManager msg="Benutzerverwaltung"/>
    <WeatherDetails/>
  </div>
</template>

<script>
import UserManager from './components/UserManager.vue';
import WeatherDetails from './components/WeatherDetails.vue';

export default {
  name: 'App',
  components: {
    UserManager,
    WeatherDetails
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