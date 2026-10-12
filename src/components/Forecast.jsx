
import { StyleSheet, View, Text } from "react-native";

export default function Forecast({ forecast }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>5-DAY FORECAST</Text>

      {forecast.map((day, index) => (
        <View key={day.date + index} style={styles.row}>
          <Text style={styles.date}>
            {day.date}
          </Text>

          <Text style={styles.condition}>
            {day.condition}
          </Text>

          <Text style={styles.temperature}>
            {Math.round(day.temperature)}°
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#182536",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },

  heading: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  date: {
    color: "white",
    fontSize: 13,
    width: "32%",
  },

  condition: {
    color: "#9CA3AF",
    fontSize: 13,
    flex: 1,
    textAlign: "center",
  },

  temperature: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    width: "18%",
    textAlign: "right",
  },
});
