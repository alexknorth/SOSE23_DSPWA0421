<template>
    <v-card> 
      <v-card-title>
        {{ address.zip  + ' '  + address.city }}
      </v-card-title>
      <v-card-subtitle>
        {{ address.street + " " + address.number }}
      </v-card-subtitle>
        <WeatherDetails></WeatherDetails>
    </v-card>
</template>

<script>
import WeatherDetails from './WeatherDetails.vue';

export default {
    props: {
        address: {}
    },
    components: { WeatherDetails }
}
</script>

<style scoped>
</style>
