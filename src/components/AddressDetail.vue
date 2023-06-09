<template>
    <v-card> 
      <v-card-title>
        {{ address.zip  + ' '  + address.city }}
      </v-card-title>
      <v-card-subtitle>
        {{ address.street + " " + address.number }}
      </v-card-subtitle>
      <v-card-text>
        <WeatherDetails :city=address.city></WeatherDetails>
      </v-card-text>
    </v-card>
</template>

<script>
import WeatherDetails from './weatherDetails.vue';

export default {
    props: {
        address: {}
    },
    components: { WeatherDetails }
}
</script>

<style scoped>
</style>
