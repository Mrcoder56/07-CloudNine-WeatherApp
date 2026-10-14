import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView} from "react-native";
import SearchBar from "../components/SearchBar";
import { getCurrentWeather } from "../services/WeatherApi";
import AirConditions from "../components/AirConditions";
import Hero from "../components/Hero";
import Forecast from "../components/Forecast";
import {  getForecast } from "../services/WeatherApi";

export default function WeatherScreen() {
  const [city, setCity] = useState("Islamabad");
  const [searchCity,setSearchCity]= useState("Mingora");
  const [weather,setWeather]=useState(null);
  const [forecast, setForecast] = useState([]);
  
  function handleSearch() {
  const trimmedCity = city.trim();

  if (trimmedCity !== "") {
    setSearchCity(trimmedCity);
  }
}
  
useEffect(() => {
  async function fetchWeather() {
    try {
      const data = await getCurrentWeather(city);
      setWeather(data);

      const forecastData = await getForecast(city);

      const dailyForecast = [];
      const dates = [];

      forecastData.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];

        if (!dates.includes(date)) {
          dates.push(date);
        }
      });

      dates.slice(0, 5).forEach((date) => {
       const dayForecast = forecastData.list.find(
  (item) => item.dt_txt.startsWith(date)
);
        if (dayForecast) {
          dailyForecast.push({
            date: date,
            temperature: dayForecast.main.temp,
            condition: dayForecast.weather[0].main,
          });
        }
      });

      setForecast(dailyForecast);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    }
  }

  fetchWeather();
}, [city]);


  return (
    <ScrollView
       style={styles.container}
    contentContainerStyle={styles.content}
    showsVerticalScrollIndicator={false}
  >

      <Text style={styles.title}>CloudNine</Text>

      <SearchBar city={city} setCity={setCity} />

      <Text style={styles.city}>{weather?.name}</Text>

      <Hero weather={weather} />
      <AirConditions weather={weather} />
      <Forecast forecast={forecast} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1420",
    padding: 20,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 30,
  },

  city: {
    color: "white",
    fontSize: 32,
    fontWeight: "600",
    marginTop: 50,
  },

  condition: {
    color: "#9CA3AF",
    fontSize: 18,
    marginTop: 8,
  },

  temperature: {
    color: "white",
    fontSize: 72,
    fontWeight: "bold",
    marginTop: 20,
  },
});