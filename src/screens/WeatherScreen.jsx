import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView} from "react-native";
import SearchBar from "../components/SearchBar";
import { getCurrentWeather } from "../services/WeatherApi";
import AirConditions from "../components/AirConditions";
import Hero from "../components/Hero";
import Forecast from "../components/Forecast";
import {  getForecast } from "../services/WeatherApi";

export default function WeatherScreen() {
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
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
    setLoading(true);
    setError("");

    try {
      const data = await getCurrentWeather(searchCity);
      setWeather(data);

      const forecastData = await getForecast(searchCity);

      // Keep your existing daily forecast-processing code here.
      // It should create dailyForecast and finish with:
      // setForecast(dailyForecast);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
      setError("Unable to load weather. Check the city or your internet connection.");
    } finally {
      setLoading(false);
    }
  }

  fetchWeather();
}, [searchCity]);


  return (
    <ScrollView
       style={styles.container}
    contentContainerStyle={styles.content}
    showsVerticalScrollIndicator={false}
  >

      <Text style={styles.title}>CloudNine</Text>

      <SearchBar
  city={city}
  setCity={setCity}
  onSearch={handleSearch}
/>
{loading && (
  <Text style={styles.message}>Loading weather...</Text>
)}

{error !== "" && (
  <Text style={styles.error}>{error}</Text>
)}

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

 message: {
  color: "#9CA3AF",
  fontSize: 16,
  textAlign: "center",
  marginTop: 20,
},
error: {
  color: "#F87171",
  fontSize: 14,
  textAlign: "center",
  marginTop: 15,
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