<template>
       
    <v-btn @click.prevent="getGeoData()"></v-btn>
    
</template>

<script>
import axios from "axios";

export default {
data() {
    
    return {
        name: "WeatherDetails",
        location: null,
        longitude: null,
        lati: null,
        city:"Hamburg"
        
       }
},

methods:{
    

    async getGeoData(){
        await axios.get("https://geocoding-api.open-meteo.com/v1/search?count=1&name=" + this.city).then(response => {this.location= response.data})
       

        var location= JSON.parse(JSON.stringify(this.location.results))
        console.log(location[0].longitude)
        console.log(location[0].latitude)
    }
}

}
</script>
