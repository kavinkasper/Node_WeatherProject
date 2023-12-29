const axios = require("axios");
const { openWeatherApiKey } = require("../Config/Apiconfig");
const path = require("path");
const fs = require("fs");

async function WeatherTemplate(location, res) {
  try {
       const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${openWeatherApiKey}`;
    const response = await axios.get(API_URL);

    if (response.status === 200) {
      const weatherData = response.data;
      const htmlTemplatePath = path.join(__dirname, "../index.html");
      let htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf8");

      htmlTemplate = htmlTemplate.replace('[Location]', `${weatherData.name}, ${weatherData.sys.country}`);
      htmlTemplate = htmlTemplate.replace('[Temperature]', `${weatherData.main.temp} K`);
      htmlTemplate = htmlTemplate.replace('[Weather]', weatherData.weather[0].description);
      htmlTemplate = htmlTemplate.replace('[Wind]', `${weatherData.wind.speed} m/s, direction ${weatherData.wind.deg}°`);
      htmlTemplate = htmlTemplate.replace('[Humidity]', `${weatherData.main.humidity}%`);

      res.send(htmlTemplate);
    } else {
      res.status(response.status).send("Error fetching weather data");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  WeatherTemplate,
};
