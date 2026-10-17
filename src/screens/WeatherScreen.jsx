
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import SearchBar from "../components/SearchBar";
import Hero from "../components/Hero";
import AirConditions from "../components/AirConditions";
import Forecast from "../components/Forecast";
import {
  getCurrentWeather,
  getForecast,
} from "../services/WeatherApi";

export default function WeatherScreen({ route }) {
  const [city, setCity] = useState("Mingora");
  const [searchCity, setSearchCity] = useState("Mingora");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSearch() {
    const trimmedCity = city.trim();

    if (trimmedCity) {
      setSearchCity(trimmedCity);
    }
  }

  // Update the weather screen when a city is selected
  // from the Cities tab.
  useEffect(() => {
    const selectedCity = route.params?.selectedCity;

    if (selectedCity) {
      setCity(selectedCity);
      setSearchCity(selectedCity);
    }
  }, [route.params?.selectedCity]);

  // Fetch current weather and the 5-day forecast.
  useEffect(() => {
    let cancelled = false;

    async function fetchWeather() {
      setLoading(true);
      setError("");
      setForecast([]);

      try {
        const currentData = await getCurrentWeather(searchCity);

        if (cancelled) return;

        setWeather(currentData);

        const forecastData = await getForecast(searchCity);

        if (cancelled) return;

        const forecastList = forecastData.list ?? [];

        // Get the first five forecast dates.
        const dates = [
          ...new Set(
            forecastList.map((item) =>
              item.dt_txt.split(" ")[0]
            )
          ),
        ].slice(0, 5);

        // Select the forecast closest to midday for each date.
        const dailyForecast = dates.map((date) => {
          const entries = forecastList.filter((item) =>
            item.dt_txt.startsWith(date)
          );

          const middayForecast = entries.reduce(
            (closest, item) => {
              const hour = Number(item.dt_txt.slice(11, 13));
              const closestHour = Number(
                closest.dt_txt.slice(11, 13)
              );

              return Math.abs(hour - 12) <
                Math.abs(closestHour - 12)
                ? item
                : closest;
            },
            entries[0]
          );

          return {
            date,
            temperature: middayForecast.main.temp,
            condition:
              middayForecast.weather?.[0]?.main ?? "Unknown",
          };
        });

        setForecast(dailyForecast);
      } catch (err) {
        console.error("Failed to fetch weather:", err);

        if (!cancelled) {
          setError(
            "Unable to load weather. Check the city, API key, and internet connection."
          );
          setWeather(null);
          setForecast([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchWeather();

    return () => {
      cancelled = true;
    };
  }, [searchCity]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>CloudNine</Text>
      <Text style={styles.subtitle}>Your weather, at a glance</Text>

      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
      />

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#60A5FA" />
          <Text style={styles.message}>
            Loading weather for {searchCity}...
          </Text>
        </View>
      )}

      {!!error && <Text style={styles.error}>{error}</Text>}

      {!loading && weather && (
        <>
          <Text style={styles.city}>{weather.name}</Text>

          <Hero weather={weather} />

          <AirConditions weather={weather} />

          <Forecast forecast={forecast} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1420",
  },
  content: {
    padding: 20,
    paddingBottom: 35,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 25,
  },
  subtitle: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 20,
  },
  city: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 5,
  },
  loading: {
    alignItems: "center",
    marginTop: 30,
    gap: 10,
  },
  message: {
    color: "#9CA3AF",
    fontSize: 14,
    textAlign: "center",
  },
  error: {
    color: "#F87171",
    fontSize: 14,
    marginTop: 20,
    lineHeight: 21,
  },
});
