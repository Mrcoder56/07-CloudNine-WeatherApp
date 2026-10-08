const API_KEY = "";

export async function getCurrentWeather(city) {
  try {
    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(city)}` +
      `&appid=${API_KEY}` +
      `&units=metric`;

    console.log("Requesting weather for:", city);

    const response = await fetch(url);

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error("Unable to fetch weather data");
    }

    const data = await response.json();

    console.log("Weather data:", data);
    

    return data;

  } catch (error) {
    console.error("Weather API error:", error);
    throw error;
  }
}
