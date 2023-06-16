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
import axios from "axios";
import WeatherData from "dataProvider.js"

const weatherData = new WeatherData();
export default {
data() {
    
    return {
        name: "WeatherDetails",
        location: null,
        longitude: null,
        lati: null,
        city:"Hamburg",
        day: null
       
        
        
       }
},

methods:{
    

    async getGeoData(){
        await axios.get("https://geocoding-api.open-meteo.com/v1/search?count=1&name=" + this.city)
        .then(response => {this.location= response.data})

        var location= JSON.parse(JSON.stringify(this.location.results))
        console.log(location[0].longitude)
        console.log(location[0].latitude)

        var geoData= {
            longitude: location[0].longitude,
            latitude:location[0].latitude

        }
        return geoData;

        },


        async getPredictions(day){
            //var location= await this.getGeoData()
            var location = await WeatherData.getGeoData("Hamburg")
            await axios.get("https://api.open-meteo.com/v1/forecast?latitude="+ location.latitude + "&longitude=" 
            +location.longitude +"&current_weather=true&forecast_days=7&timezone=CET&daily=temperature_2m_min,"+
            "temperature_2m_max,windspeed_10m_max,precipitation_probability_mean,winddirection_10m_dominant")
            .then(response => {this.prediction= response.data})

            var weatherDaily= {
                date: JSON.parse(JSON.stringify(this.prediction.daily.time[day])),
                lowestTemp: JSON.parse(JSON.stringify(this.prediction.daily.temperature_2m_min[day])),
                highestTemp: JSON.parse(JSON.stringify(this.prediction.daily.temperature_2m_max[day])),
                windSpeed: JSON.parse(JSON.stringify(this.prediction.daily.windspeed_10m_max[day]))
            }

            console.log(weatherDaily)
            return weatherDaily;

        },

        async getCurrentWeather(){
            //var location= await this.getGeoData()
            var location = await WeatherData.getGeoData("Hamburg")
            await axios.get("https://api.open-meteo.com/v1/forecast?latitude="+ location.latitude + "&longitude=" 
            +location.longitude +"&current_weather=true&forecast_days=7&timezone=CET&daily=temperature_2m_min,"+
            "temperature_2m_max,windspeed_10m_max,precipitation_probability_mean,winddirection_10m_dominant")
            .then(response => {this.today=response.data})
            var weatherToday={
                lowestTemp: JSON.parse(JSON.stringify(this.today.daily.temperature_2m_min[0])),
                highestTemp: JSON.parse(JSON.stringify(this.today.daily.temperature_2m_max[0])),
                windSpeed: JSON.parse(JSON.stringify(this.today.daily.windspeed_10m_max[0])),

                currentTemp: JSON.parse(JSON.stringify(this.today.current_weather.temperature))
            
            }
            console.log(weatherToday)
            return weatherToday;


        }
}

}
</script>