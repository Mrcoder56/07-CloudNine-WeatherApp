import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import SearchBar from "../components/SearchBar";

export default function WeatherScreen() {
  const [city, setCity] = useState("Islamabad");

  return (
    <View style={styles.container}>

      <Text style={styles.title}>CloudNine</Text>

      <SearchBar city={city} setCity={setCity} />

      <Text style={styles.city}>{city}</Text>

      <Text style={styles.condition}>Cloudy</Text>

      <Text style={styles.temperature}>28°</Text>

    </View>
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