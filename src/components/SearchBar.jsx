
import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";

export default function SearchBar({ city, setCity, onSearch }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search city..."
        placeholderTextColor="#9CA3AF"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={onSearch}
        returnKeyType="search"
      />

      <Pressable style={styles.button} onPress={onSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>
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
    borderRadius: 15.0,
    paddingHorizontal: 18,
    color: "white",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3533CD",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
