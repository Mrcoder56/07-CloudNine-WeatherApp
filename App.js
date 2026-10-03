import { StyleSheet, View, Text } from "react-native";

export default function App() {
  return (
    
    <View style={styles.container}>
      <View style={styles.Tcontainer }>
        <Text style={{color:"white" }}>Khan</Text>
      </View>
      <Text style={styles.title}>CloudNine</Text>
      <Text style={styles.subtitle}>Weather App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1420",
    alignItems: "center",
    justifyContent: "center",
  },
  Tcontainer:{
height:"100px",
width:"100px",
color:"white",
  },

  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: 18,
    marginTop: 8,
  },
});