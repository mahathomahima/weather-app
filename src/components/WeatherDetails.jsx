import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_KEY = "1982195ac0c96b9cac533d4e8e78d314"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5";

function WeatherDetails({ city, darkMode }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;
    fetchWeather();
  }, [city]);

  const fetchWeather = async () => {
    try {
      const weatherResponse = await axios.get(`${BASE_URL}/weather`, {
        params: { q: city, appid: API_KEY, units: "metric" },
      });

      const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
        params: { q: city, appid: API_KEY, units: "metric" },
      });

      const dailyForecast = forecastResponse.data.list
        ? forecastResponse.data.list.filter((reading) =>
            reading.dt_txt.includes("12:00:00")
          )
        : [];

      setWeather(weatherResponse.data);
      setForecast(dailyForecast);
      setLoading(false);
    } catch (error) {
      setError("City not found");
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  // Prepare Data for Chart.js
  const chartData = {
    labels: forecast.map((data) =>
      new Date(data.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })
    ),
    datasets: [
      {
        label: "Temperature (°C)",
        data: forecast.map((data) => data.main.temp),
        borderColor: darkMode ? "rgb(255, 206, 86)" : "rgb(75, 192, 192)",
        backgroundColor: darkMode
          ? "rgba(255, 206, 86, 0.2)"
          : "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  return (
    <div className={`${darkMode ? "text-black" : "bg-gray-100"} p-6`}>
      {/* Weather Info */}
      <div className={`${darkMode? "bg-black text-white" : "bg-white text-gray"} max-w-4xl mx-auto p-6 rounded shadow-md mt-4`}>
        <h1 className="text-3xl font-bold">{weather.name}, {weather.sys.country}</h1>
        <p className="text-lg mt-2">🌡 Temperature: <span className="font-bold">{weather.main.temp}°C</span></p>
        <p className="text-lg">☁ {weather.weather[0].description}</p>
        <p className="mt-2">💨 Wind Speed: {weather.wind.speed} m/s</p>
        <p>💧 Humidity: {weather.main.humidity}%</p>
      </div>

      {/* 5-Day Forecast Graph */}
      <div className={`${darkMode? "bg-black text-white" : "bg-white text-black"} max-w-4xl mx-auto p-6 rounded shadow-md mt-6`}>
        <h2 className="text-xl font-semibold text-center mb-4">5-Day Temperature Forecast</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default WeatherDetails;


