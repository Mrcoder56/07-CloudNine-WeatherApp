
import { StyleSheet, View, Text, ScrollView } from "react-native";

const cities = [
  {
    id: "1",
    name: "Swat",
    country: "Pakistan",
    temperature: 22,
    condition: "Clouds",
    icon: "☁️",
  },
  {
    id: "2",
    name: "Islamabad",
    country: "Pakistan",
    temperature: 30,
    condition: "Clear",
    icon: "☀️",
  },
  {
    id: "3",
    name: "London",
    country: "United Kingdom",
    temperature: 16,
    condition: "Rain",
    icon: "🌧️",
  },
];

export default function CitiesScreen() {
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

      {cities.map((city) => (
        <View key={city.id} style={styles.cityCard}>
          <View>
            <Text style={styles.cityName}>{city.name}</Text>
            <Text style={styles.country}>{city.country}</Text>
            <Text style={styles.condition}>{city.condition}</Text>
          </View>

          <View style={styles.weatherInfo}>
            <Text style={styles.icon}>{city.icon}</Text>
            <Text style={styles.temperature}>
              {city.temperature}°
            </Text>
          </View>
        </View>
      ))}
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
});
