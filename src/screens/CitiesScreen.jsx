
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";

import { getCurrentWeather } from "../services/WeatherApi";

const cityNames = [
  "Swat",
  "Islamabad",
  "London",
];

function getWeatherIcon(condition) {
  switch (condition) {
    case "Clear":
      return "☀️";
    case "Clouds":
      return "☁️";
    case "Rain":
    case "Drizzle":
      return "🌧️";
    case "Thunderstorm":
      return "⛈️";
    case "Snow":
      return "❄️";
    default:
      return "🌤️";
  }
}

export default function CitiesScreen() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCitiesWeather() {
      setLoading(true);
      setError("");

      try {
        const results = await Promise.all(
          cityNames.map((name) => getCurrentWeather(name))
        );

        setCities(results);
      } catch (err) {
        console.error("Failed to fetch cities weather:", err);
        setError("Unable to load city weather. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchCitiesWeather();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Your Cities</Text>

      <Text style={styles.subtitle}>
        Check the weather in your favorite places.
      </Text>

      {loading && (
        <Text style={styles.message}>Loading city weather...</Text>
      )}

      {error !== "" && (
        <Text style={styles.error}>{error}</Text>
      )}

      {!loading &&
        cities.map((city) => {
          const condition = city.weather?.[0]?.main;

          return (
            <Pressable
  key={city.id}
  style={styles.cityCard}
  onPress={() => {
    console.log("Selected city:", city.name);
  }}
>
              <View style={styles.cityDetails}>
                <Text style={styles.cityName}>{city.name}</Text>

                <Text style={styles.country}>
                  {city.sys?.country}
                </Text>

                <Text style={styles.condition}>
                  {condition}
                </Text>
              </View>

              <View style={styles.weatherInfo}>
                <Text style={styles.icon}>
                  {getWeatherIcon(condition)}
                </Text>

                <Text style={styles.temperature}>
                  {Math.round(city.main?.temp ?? 0)}°
                </Text>
              </View>
            </Pressable>
          );
        })}
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
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#9CA3AF",
    fontSize: 15,
    marginTop: 8,
    marginBottom: 25,
  },
  cityCard: {
    backgroundColor: "#182536",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cityDetails: {
    flex: 1,
  },
  cityName: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  country: {
    color: "#9CA3AF",
    fontSize: 13,
    marginTop: 4,
  },
  condition: {
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 10,
  },
  weatherInfo: {
    alignItems: "center",
  },
  icon: {
    fontSize: 32,
  },
  temperature: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 5,
  },
  message: {
    color: "#9CA3AF",
    fontSize: 16,
    marginVertical: 20,
  },
  error: {
    color: "#F87171",
    fontSize: 14,
    marginVertical: 20,
  },
});
