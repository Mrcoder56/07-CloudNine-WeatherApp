import { StyleSheet, View, TextInput } from "react-native";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search City..."
        placeholderTextColor="#9CA3AF"
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