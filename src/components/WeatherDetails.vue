<template>
  <div v-if="weather!==null">
    <v-card class="mx-auto" max-width="368">
    <v-card-item title=Berlin>
        <template v-slot:subtitle>
        <v-icon icon="mdi-alert" size="18" color="error" class="me-1 pb-1"></v-icon>
        <!-- Add weather notice -->
        </template>
    </v-card-item>

    <v-card-text class="py-0">
        <v-row align="center" no-gutters>
        <v-col class="text-h2" cols="6" >
        {{ weather.current_weather.temperature + weather.daily_units.temperature_2m_min}}
        </v-col>

        <v-col cols="6" class="text-right">
            <v-icon
            color="error"
            icon="mdi-weather-hurricane"
            size="88"
            ></v-icon>
        </v-col>
        </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
        <v-list-item
        density="compact"
        prepend-icon="mdi-weather-windy"
        >
        <v-list-item-subtitle>{{ weather.current_weather.windspeed + weather.daily_units.windspeed_10m_max }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item
        density="compact"
        prepend-icon="mdi-weather-pouring"
        >
        <v-list-item-subtitle>{{ weather.current_weather.weathercode + weather.daily_units.precipitation_probability_mean }}</v-list-item-subtitle>
        </v-list-item>
    </div>
    <v-expand-transition>
        <div v-if="expand">
        <div class="py-2">
            <v-slider
            v-model="time"
            :max="6"
            :step="1"
            :ticks="labels"
            class="mx-4"
            color="primary"
            density="compact"
            hide-details
            show-ticks="always"
            thumb-size="10"
            ></v-slider>
        </div>

        <v-list class="bg-transparent">
            <v-list-item
            v-for="i in 5"
            :key="i"
            :title="weather.daily.time[i]"
            :append-icon="mdi-cloud"
            :subtitle="weather.daily.temperature_2m_max[i] + weather.daily_units.temperature_2m_min"
            >
            </v-list-item>
        </v-list>
        </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions>
        <v-btn @click="expand = !expand">
        {{ !expand ? 'Full Report' : 'Hide Report' }}
        </v-btn>
    </v-card-actions>
  
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    city: {}
  },
  data() {
    return {
        labels: { 0: 'SU', 1: 'MO', 2: 'TU', 3: 'WED', 4: 'TH', 5: 'FR', 6: 'SA' },
        expand: false,
        time: 0,
        forecast: [
            { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
            { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
            { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
        ],
        weather: null,
    };
  },
  methods: {
    async loadWeather() {
      await axios.get(
        "https://api.open-meteo.com/v1/forecast?latitude=54.18&longitude=12.43&current_weather=true&forecast_days=7&timezone=CET&daily=temperature_2m_min,temperature_2m_max,windspeed_10m_max,precipitation_probability_mean,winddirection_10m_dominant"
      ).then(response=>this.weather=response.data);
    },
  },
  mounted() {
  this.$nextTick(async function () {
    await this.loadWeather();
  })
}
}
</script>

<style scoped>
</style>
