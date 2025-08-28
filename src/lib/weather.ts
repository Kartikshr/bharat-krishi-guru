export async function fetchWeather(city: string) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY as string;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather API failed");

  return res.json();
}
