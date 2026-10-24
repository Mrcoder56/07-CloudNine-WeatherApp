
import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
} from "react-native";

import { getCurrentWeather } from "../services/WeatherApi";
import { getCities, addCity } from "../services/CityStorage";

export default function WeatherScreen({ navigation, route }) {
  const [city, setCity] = useState("Swat");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const fetchWeather = async (cityName) => {
    if (!cityName?.trim()) {
      Alert.alert("Enter a city", "Please enter a city name.");
      return;
    }

    Keyboard.dismiss();
    setLoading(true);

    try {
      const data = await getCurrentWeather(cityName.trim());

      if (!data?.name) {
        throw new Error("City not found");
      }

      setWeather(data);
      setCity(data.name);

      const savedCities = await getCities();

      setIsSaved(
        savedCities.some(
          (item) =>
            item.toLowerCase() === data.name.toLowerCase()
        )
      );
    } catch (error) {
      setWeather(null);
      setIsSaved(false);

      Alert.alert(
        "Weather unavailable",
        "Could not find that city. Check the name and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const selectedCity = route?.params?.selectedCity;

    fetchWeather(selectedCity || "Swat");
  }, [route?.params?.requestId, route?.params?.selectedCity]);

  const handleAddCity = async () => {
    if (!weather?.name || saving) return;

    setSaving(true);

    try {
      const savedCities = await getCities();

      const alreadySaved = savedCities.some(
        (item) =>
          item.toLowerCase() === weather.name.toLowerCase()
      );

      if (alreadySaved) {
        setIsSaved(true);

        Alert.alert(
          "Already Added",
          `${weather.name} is already in My Cities.`
        );

        return;
      }

      await addCity(weather.name);
      setIsSaved(true);

      Alert.alert(
        "City Added",
        `${weather.name} has been added to My Cities.`
      );
    } catch (error) {
      Alert.alert("Error", "Could not save this city.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>CloudNine</Text>
      <Text style={styles.subtitle}>Weather at a glance</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Search city..."
          placeholderTextColor="#91A0B5"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={() => fetchWeather(city)}
          returnKeyType="search"
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => fetchWeather(city)}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FFFFFF"
          style={styles.loader}
        />
      ) : weather ? (
        <View style={styles.weatherCard}>
          <Text style={styles.cityName}>{weather.name}</Text>

          <Text style={styles.temperature}>
            {Math.round(weather.main.temp)}°
          </Text>

          <Text style={styles.condition}>
            {weather.weather?.[0]?.description}
          </Text>

          <View style={styles.detailsRow}>
            <Text style={styles.detail}>
              Feels like {Math.round(weather.main.feels_like)}°
            </Text>

            <Text style={styles.detail}>
              Humidity {weather.main.humidity}%
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.addButton,
              isSaved && styles.savedButton,
            ]}
            onPress={handleAddCity}
            disabled={saving || isSaved}
          >
            <Text style={styles.buttonText}>
              {saving
                ? "Saving..."
                : isSaved
                ? "✓ Added to My Cities"
                : "＋ Add to My Cities"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.emptyText}>
          Search for a city to see its weather.
        </Text>
      )}

      <TouchableOpacity
        style={styles.citiesButton}
        onPress={() => navigation.navigate("Cities")}
      >
        <Text style={styles.buttonText}>View My Cities</Text>
      </TouchableOpacity>
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
    flexGrow: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#91A0B5",
    marginTop: 5,
    marginBottom: 25,
  },
  searchRow: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#172536",
    borderRadius: 12,
    paddingHorizontal: 14,
    color: "#FFFFFF",
    minHeight: 50,
  },
  searchButton: {
    backgroundColor: "#3533CD",
    borderRadius: 12,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  loader: {
    marginTop: 50,
  },
  weatherCard: {
    backgroundColor: "#172536",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginTop: 25,
  },
  cityName: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  temperature: {
    color: "#FFFFFF",
    fontSize: 66,
    fontWeight: "300",
    marginTop: 10,
  },
  condition: {
    color: "#91A0B5",
    fontSize: 17,
    textTransform: "capitalize",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 25,
  },
  detail: {
    color: "#FFFFFF",
    fontSize: 13,
  },
  addButton: {
    backgroundColor: "#3533CD",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  savedButton: {
    backgroundColor: "#245B49",
  },
  citiesButton: {
    backgroundColor: "#172536",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    color: "#91A0B5",
    marginTop: 30,
    textAlign: "center",
  },
});
