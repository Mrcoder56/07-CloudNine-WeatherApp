
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@cloudnine/cities";

const DEFAULT_CITIES = ["Swat", "Islamabad"];

export async function getCities() {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);

    if (saved === null) {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(DEFAULT_CITIES)
      );

      return DEFAULT_CITIES;
    }

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : DEFAULT_CITIES;
  } catch (error) {
    console.error("Error loading cities:", error);
    return DEFAULT_CITIES;
  }
}

export async function addCity(city) {
  const name = city?.trim();

  if (!name) return getCities();

  const cities = await getCities();

  const alreadyExists = cities.some(
    (item) => item.toLowerCase() === name.toLowerCase()
  );

  if (alreadyExists) return cities;

  const updatedCities = [...cities, name];

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedCities)
  );

  return updatedCities;
}

export async function removeCity(city) {
  const cities = await getCities();

  const updatedCities = cities.filter(
    (item) => item.toLowerCase() !== city.toLowerCase()
  );

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedCities)
  );

  return updatedCities;
}
