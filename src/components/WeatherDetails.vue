<template>
  <div><!-- v-if="weather !== null">-->
    <v-card class="mx-auto" max-width="368">
      <v-card-item :title="city">
        <template v-slot:subtitle>
        </template>
      </v-card-item>

      <div v-if="weather.current!== null">
        <v-card-text class="py-0">
            <v-row align="center" no-gutters>
            <v-col class="text-h2" cols="6">
                {{
                weather.current.lowestTemp +
                '°C'
                }}
            </v-col>

            <v-col cols="6" class="text-right">
                <v-icon
                color="error"
                :icon="getIconByWeatherCode(weather.current.weathercode)"
                size="88"
                ></v-icon>
            </v-col>
            </v-row>
        </v-card-text>

        <div class="d-flex py-3 justify-space-between">
            <v-list-item density="compact" prepend-icon="mdi-weather-windy">
            <v-list-item-subtitle>{{
                weather.current.windSpeed + 'km/h'
            }}</v-list-item-subtitle>
            </v-list-item>

<!--            <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
            <v-list-item-subtitle>{{
                weather.current_weather.weathercode +
                weather.daily_units.precipitation_probability_mean
            }}</v-list-item-subtitle>
            </v-list-item> -->
        </div>
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

          <v-list class="bg-transparent" v-if="weather.prediction !== null">
            <v-list-item
              v-for="item in weather.prediction"
            :key="item.day"
            :title="item.day"
            :append-icon="item.icon"
            :subtitle="item.temp"
            >
            </v-list-item>
          </v-list>
        </div>
      </v-expand-transition>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn @click="expand = !expand">
          {{ !expand ? "Full Report" : "Hide Report" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import WeatherData from "../dataProvider.js";

const weatherData = new WeatherData();
export default {
    props: {
        city: null
    },
    data() {
        return {
            labels: { 0: 'SU', 1: 'MO', 2: 'TU', 3: 'WED', 4: 'TH', 5: 'FR', 6: 'SA' },
            expand: false,
            time: 0,
            name: "WeatherDetails",
            weather: {
                current: null,
                prediction: null,
            }
        };
    },


/*

forecast: [
            { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
            { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
            { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
        ],
*/

  methods: {
    async getPredictions() {
      var labelsFull = { 0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday' };
      this.weather.prediction = [];
      var rawData = await weatherData.getPredictions(this.city, 7);
        for (let i = 1; i < 7; i++){
            this.weather.prediction.push({ day: labelsFull[new Date(rawData.daily.time[i]).getDay()], icon: 'mdi-white-balance-sunny', temp:  rawData.daily.temperature_2m_min[i] + '\xB0/' + rawData.daily.temperature_2m_max[i] + '\xB0' });
        }
    },
    async getCurrentWeather() {
      this.weather.current = await weatherData.getCurrentWeather(this.city);
    },
    getIconByWeatherCode(weatherCode) {
        if (weatherCode < 5) {
            return "mdi-abjad-arabic";
        } else {
            return "mdi-access-point-plus";
        }
    }
  },
  mounted() {
    this.$nextTick(async function () {
        await this.getCurrentWeather();
        await this.getPredictions();
    })
  }
};
</script>