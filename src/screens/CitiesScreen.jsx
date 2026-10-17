
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { getCurrentWeather } from "../services/WeatherApi";

const cityNames = ["Swat,PK", "Islamabad,PK", "London,GB"];

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
    case "Mist":
    case "Fog":
    case "Haze":
      return "🌫️";
    default:
      return "🌤️";
  }
}

export default function CitiesScreen({ navigation }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchCitiesWeather() {
      setLoading(true);
      setError("");

      try {
        const results = await Promise.allSettled(
          cityNames.map((name) => getCurrentWeather(name))
        );

        if (cancelled) return;

        const successfulCities = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value);

        const failedCount =
          results.length - successfulCities.length;

        setCities(successfulCities);

        if (successfulCities.length === 0) {
          setError(
            "Unable to load cities. Check your API key and internet connection."
          );
        } else if (failedCount > 0) {
          setError(
            `${failedCount} city request(s) failed. Some cities may be missing.`
          );
        }
      } catch (err) {
        console.error("Failed to load city weather:", err);

        if (!cancelled) {
          setError("Unable to load city weather. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchCitiesWeather();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleCityPress(city) {
    // The tab route must be named "Weather" in TabNavigator.
    navigation.navigate("Weather", {
      selectedCity: city.name,
    });
  }

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
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#60A5FA" />
          <Text style={styles.message}>
            Loading city weather...
          </Text>
        </View>
      )}

      {!!error && <Text style={styles.error}>{error}</Text>}

      {!loading &&
        cities.map((city) => {
          const condition = city.weather?.[0]?.main ?? "Unknown";
          const temperature = city.main?.temp;

          return (
            <Pressable
              key={city.id}
              style={({ pressed }) => [
                styles.cityCard,
                pressed && styles.cardPressed,
              ]}
              onPress={() => handleCityPress(city)}
            >
              <View style={styles.cityDetails}>
                <Text style={styles.cityName}>{city.name}</Text>

                <Text style={styles.country}>
                  {city.sys?.country ?? ""}
                </Text>

                <Text style={styles.condition}>{condition}</Text>

                <Text style={styles.tapHint}>
                  Tap to view weather
                </Text>
              </View>

              <View style={styles.weatherInfo}>
                <Text style={styles.icon}>
                  {getWeatherIcon(condition)}
                </Text>

                <Text style={styles.temperature}>
                  {typeof temperature === "number"
                    ? `${Math.round(temperature)}°`
                    : "--"}
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
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 25,
  },
  cityCard: {
    backgroundColor: "#182536",
    borderRadius: 18,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#26374A",
  },
  cardPressed: {
    opacity: 0.75,
  },
  cityDetails: {
    flex: 1,
    paddingRight: 10,
  },
  cityName: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
  },
  country: {
    color: "#9CA3AF",
    fontSize: 13,
    marginTop: 3,
  },
  condition: {
    color: "#D1D5DB",
    fontSize: 15,
    marginTop: 10,
  },
  tapHint: {
    color: "#60A5FA",
    fontSize: 12,
    marginTop: 8,
  },
  weatherInfo: {
    alignItems: "center",
    minWidth: 75,
  },
  icon: {
    fontSize: 34,
  },
  temperature: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "600",
    marginTop: 5,
  },
  loading: {
    alignItems: "center",
    marginTop: 25,
    gap: 10,
  },
  message: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  error: {
    color: "#F87171",
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 21,
  },
});
