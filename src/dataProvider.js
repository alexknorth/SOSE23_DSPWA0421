import axios from "axios";

class WeatherData {
  async getGeoData(city) {
    var location;

    await axios
      .get(
        "https://geocoding-api.open-meteo.com/v1/search?count=1&name=" + city
      )

      .then((response) => {
        location = JSON.parse(JSON.stringify(response.data.results));
      });

    //var location= location.results

    console.log(location[0].longitude);

    console.log(location[0].latitude);

    var geoData = {
      longitude: location[0].longitude,

      latitude: location[0].latitude,
    };

    return geoData;
  }

  async getPredictions(city, numberOfDays) {
    console.log("getPredictions");
    var location = await this.getGeoData(city);

    const path = 
    "https://api.open-meteo.com/v1/forecast?latitude=" +
      location.latitude +
      "&longitude=" +
      location.longitude +
      "&current_weather=true&forecast_days="+
      numberOfDays+
      "&timezone=CET&daily=temperature_2m_min," +
      "temperature_2m_max,windspeed_10m_max,precipitation_probability_mean,winddirection_10m_dominant";
    var prediction = {};
    await axios
      .get(path)
      .then((response) => {
        prediction = response.data;
      }).catch((error) => {
        console.log(error);
      });
      return prediction;
  }

  async getCurrentWeather(city) {
    var location = await this.getGeoData(city);
    var today;
    await axios
      .get(
        "https://api.open-meteo.com/v1/forecast?latitude=" +
          location.latitude +
          "&longitude=" +
          location.longitude +
          "&current_weather=true&timezone=CET&daily=temperature_2m_min," +
          "temperature_2m_max,windspeed_10m_max,precipitation_probability_mean,winddirection_10m_dominant"
      ).then((response) => {
        today = response.data;
      }).catch((error) => {
        console.log(error);
        return {};
      });

    var weatherToday = {
      lowestTemp: today.daily.temperature_2m_min[0],
      highestTemp: today.daily.temperature_2m_max[0],
      windSpeed: today.daily.windspeed_10m_max[0],
      currentTemp: today.current_weather.temperature,
      weatherCode: today.current_weather.weathercode,
    };

    return weatherToday;
  }
}

export default WeatherData;
