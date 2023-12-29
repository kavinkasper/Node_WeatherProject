const express = require("express");
const { WeatherTemplate } = require("./Handlers/Weatherhandlers.js");
const app = express();

const portNumber = 3500;
app.use(express.static('public')); 

// when the page loads it will defaultly show the weather report of New York location and here no request is given
app.get("/", async (req, res) => {
  const location = "Tamil nadu";
  await WeatherTemplate(location, res);

});

//By giving input we are requesting the weather report of particular country. 
app.get("/getWeather", async (req, res) => {
  const location = req.query.location;
  await WeatherTemplate(location, res);
});

app.listen(portNumber, () => {
  console.log(`Server is running on port: ${portNumber}`);
});
