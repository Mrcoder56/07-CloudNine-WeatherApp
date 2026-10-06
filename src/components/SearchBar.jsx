import { StyleSheet, View, TextInput } from "react-native";

export default function SearchBar({ city, setCity }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search city..."
        placeholderTextColor="#9CA3AF"
        value={city}
        onChangeText={setCity}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },

  input: {
    height: 50,
    backgroundColor: "#182536",
    borderRadius: 15,
    paddingHorizontal: 18,
    color: "white",
    fontSize: 16,
  },
});