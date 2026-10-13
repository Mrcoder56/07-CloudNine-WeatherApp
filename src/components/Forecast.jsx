
import { StyleSheet, View, Text } from "react-native";

function getDayName(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
  });
}

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

export default function Forecast({ forecast }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>5-DAY FORECAST</Text>

      {forecast.map((day, index) => (
        <View key={day.date + index} style={styles.row}>
          <Text style={styles.date}>
            {getDayName(day.date)}
          </Text>

          <Text style={styles.icon}>
            {getWeatherIcon(day.condition)}
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
    marginBottom: 20,
  },

  heading: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  date: {
    color: "white",
    fontSize: 14,
    width: 45,
  },

  icon: {
    fontSize: 24,
    width: 38,
    textAlign: "center",
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
    width: 45,
    textAlign: "right",
  },
});
