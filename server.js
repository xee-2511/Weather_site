// server.js
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// Weather endpoint
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const weatherResponse = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: city,
        appid: process.env.WEATHER_API_KEY,
        units: "metric",
      },
    });

    res.json(weatherResponse.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.response?.data || error.message);

    if (error.response && error.response.status === 404) {
      // City not found - return 404 to frontend
      return res.status(404).json(error.response.data);
    }

    // Other errors
    res.status(500).json({ error: "Error fetching weather data" });
  }
});


// News endpoint
app.get("/api/news", async (req, res) => {
  try {
    const newsResponse = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
    );
    res.json(newsResponse.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching news data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  

});
