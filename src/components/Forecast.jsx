
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
    case "Mist":
    case "Fog":
    case "Haze":
      return "🌫️";
    default:
      return "🌤️";
  }
}

export default function Forecast({ forecast = [] }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>5-DAY FORECAST</Text>

      {forecast.length === 0 ? (
        <Text style={styles.emptyMessage}>
          Forecast data is not available yet.
        </Text>
      ) : (
        forecast.map((day, index) => (
          <View key={`${day.date}-${index}`} style={styles.row}>
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
              {typeof day.temperature === "number"
                ? `${Math.round(day.temperature)}°`
                : "--"}
            </Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#182536",
    borderRadius: 18,
    padding: 18,
    marginTop: 25,
    marginBottom: 20,
  },
  heading: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#2B394B",
  },
  date: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    width: 48,
  },
  icon: {
    fontSize: 23,
    width: 43,
    textAlign: "center",
  },
  condition: {
    color: "#D1D5DB",
    fontSize: 14,
    flex: 1,
    marginLeft: 8,
  },
  temperature: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    minWidth: 42,
    textAlign: "right",
  },
  emptyMessage: {
    color: "#9CA3AF",
    fontSize: 14,
    paddingVertical: 12,
    lineHeight: 21,
  },
});
