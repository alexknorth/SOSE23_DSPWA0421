<template>
  <div>
    <v-btn @click.prevent="getGeoData('Hamburg')"> GeoData </v-btn>
    <v-btn @click="getPredictions('Hamburg', 3)">7 Tage </v-btn>
    <v-btn @click.prevent="getCurrentWeather('Hamburg')"> Heute </v-btn>
  </div>
</template>

<script>
import WeatherData from "../dataProvider.js";

const weatherData = new WeatherData();

export default {
  data() {
    return {
      name: "WeatherDetails",
    };
  },

  methods: {
    async getPredictions(city, day) {
      weatherData.getPredictions(city, day);
    },

    async getCurrentWeather(city) {
      weatherData.getCurrentWeather(city);
    },
  },
};
</script>
