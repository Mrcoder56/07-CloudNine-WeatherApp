import { StyleSheet, View, Text } from "react-native";

export default function Hero({ weather }) {
  const condition = weather?.weather?.[0]?.main;

  let icon = "🌤️";

  if (condition === "Clear") {
    icon = "☀️";
  } else if (condition === "Clouds") {
    icon = "☁️";
  } else if (condition === "Rain" || condition === "Drizzle") {
    icon = "🌧️";
  } else if (condition === "Thunderstorm") {
    icon = "⛈️";
  } else if (condition === "Snow") {
    icon = "❄️";
  } else if (condition === "Mist" || condition === "Fog" || condition === "Haze") {
    icon = "🌫️";
  }

  return (
    <View style={styles.hero}>

      <Text style={styles.icon}>
        {icon}
      </Text>

      <Text style={styles.temperature}>
        {Math.round(weather?.main?.temp ?? 0)}°
      </Text>

      <Text style={styles.description}>
        {weather?.weather?.[0]?.description}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    marginTop: 30,
  },

  icon: {
    fontSize: 90,
  },

  temperature: {
    color: "white",
    fontSize: 64,
    fontWeight: "bold",
    marginTop: 10,
  },

  description: {
    color: "#9CA3AF",
    fontSize: 18,
    marginTop: 5,
    textTransform: "capitalize",
  },
});