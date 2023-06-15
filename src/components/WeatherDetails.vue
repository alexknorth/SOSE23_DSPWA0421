<template>
    <div>
        <v-btn @click.prevent="getGeoData()"> GeoData </v-btn>
        <v-btn @click="getPredictions(2)">7 Tage </v-btn>
        <v-btn @click.prevent="getCurrentWeather()"> Heute </v-btn>
    </div>
</template>

<script>
import axios from "axios";
import WeatherData from "dataProvider.js"

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
