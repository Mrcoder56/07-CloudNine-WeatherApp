
import React, { useCallback, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { getCurrentWeather } from "../services/WeatherApi";

import {
  getCities,
  removeCity,
} from "../services/CityStorage";

export default function CitiesScreen({ navigation }) {
  const [cities, setCities] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  const loadCities = useCallback(async () => {
    setLoading(true);

    try {
      const savedCities = await getCities();
      setCities(savedCities);

      const results = await Promise.all(
        savedCities.map(async (city) => {
          try {
            const data = await getCurrentWeather(city);
            return [city, data];
          } catch {
            return [city, null];
          }
        })
      );

      setWeatherData(Object.fromEntries(results));
    } catch (error) {
      console.error("Could not load cities:", error);
      Alert.alert("Error", "Could not load your saved cities.");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCities();
    }, [loadCities])
  );

  const handleRemove = (city) => {
    Alert.alert(
      "Remove City",
      `Remove ${city} from My Cities?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              const updated = await removeCity(city);
              setCities(updated);

              setWeatherData((previous) => {
                const next = { ...previous };
                delete next[city];
                return next;
              });
            } catch (error) {
              Alert.alert("Error", "Could not remove this city.");
            }
          },
        },
      ]
    );
  };

  const renderCity = ({ item }) => {
    const weather = weatherData[item];

    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.cityInfo}
          onPress={() =>
            navigation.navigate("Weather", {
              selectedCity: item,
              requestId: Date.now(),
            })
          }
        >
          <Text style={styles.cityName}>{item}</Text>

          <Text style={styles.condition}>
            {weather?.weather?.[0]?.description ||
              "Weather unavailable"}
          </Text>
        </TouchableOpacity>

        <View style={styles.rightSide}>
          {weather?.main?.temp != null && (
            <Text style={styles.temperature}>
              {Math.round(weather.main.temp)}°
            </Text>
          )}

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemove(item)}
          >
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cities</Text>

      <Text style={styles.subtitle}>
        Your saved weather locations
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FFFFFF"
          style={styles.loader}
        />
      ) : (
        <FlatList
          data={cities}
          keyExtractor={(item) => item.toLowerCase()}
          renderItem={renderCity}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No cities saved yet. Search for a city and tap
              {" "}Add to My Cities.
            </Text>
          }
          refreshing={loading}
          onRefresh={loadCities}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1420",
    paddingTop: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  subtitle: {
    color: "#91A0B5",
    marginTop: 6,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#172536",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cityInfo: {
    flex: 1,
    marginRight: 10,
  },
  cityName: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "600",
  },
  condition: {
    color: "#91A0B5",
    marginTop: 5,
    textTransform: "capitalize",
  },
  rightSide: {
    alignItems: "flex-end",
    gap: 8,
  },
  temperature: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  removeButton: {
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 8,
    backgroundColor: "#38232B",
  },
  removeText: {
    color: "#FF8B8B",
    fontSize: 12,
    fontWeight: "600",
  },
  loader: {
    marginTop: 50,
  },
  emptyText: {
    color: "#91A0B5",
    textAlign: "center",
    marginTop: 40,
    lineHeight: 22,
  },
});
