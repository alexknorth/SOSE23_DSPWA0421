<template>
    <v-card> 
      <v-card-title>
        {{ address.zip  + ' '  + address.city }}
      </v-card-title>
      <v-card-subtitle>
        {{ address.street + " " + address.number }}
        <WeatherDetails :city="address.city"/>
      </v-card-subtitle>
      <v-card-text>

      </v-card-text>
    </v-card>
</template>

<script>
import WeatherDetails from './WeatherDetails.vue';

export default {
  components: {
    WeatherDetails
  },
  props: {
    address: {}
  }
}
</script>

<style scoped>
</style>
