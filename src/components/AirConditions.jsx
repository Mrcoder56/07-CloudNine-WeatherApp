
import { StyleSheet, View, Text } from "react-native";

export default function AirConditions({ weather }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>AIR CONDITIONS</Text>

      <View style={styles.grid}>
        <View style={styles.item}>
          <Text style={styles.label}>Feels Like</Text>
          <Text style={styles.value}>
            {Math.round(weather?.main?.feels_like ?? 0)}°
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Humidity</Text>
          <Text style={styles.value}>
            {weather?.main?.humidity ?? 0}%
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Wind Speed</Text>
          <Text style={styles.value}>
            {((weather?.wind?.speed ?? 0) * 3.6).toFixed(1)} km/h
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Pressure</Text>
          <Text style={styles.value}>
            {weather?.main?.pressure ?? 0} hPa
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#182536",
    borderRadius: 20,
    padding: 20,
    marginTop: 30,
  },

  heading: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  item: {
    width: "50%",
    marginBottom: 24,
  },

  label: {
    color: "#9CA3AF",
    fontSize: 14,
    marginBottom: 8,
  },

  value: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
  },
});
