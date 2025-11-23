console.log("js loaded!!");

let input = document.getElementById("search");
let city = document.getElementById("city");
let country = document.getElementById("country");
let condition = document.getElementById("condition");
let current_temp = document.getElementById("current_temp");
let max_temp = document.getElementById("max_temp");
let min_temp = document.getElementById("min_temp");
let date = document.getElementById("date");
let time = document.getElementById("time");
let Weather_icon = document.getElementById("Weather_icon");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");
let wind_speed = document.getElementById("wind_speed");
let humidity = document.getElementById("humidity");
let cloud_cover = document.getElementById("cloud_cover");
let uv_index = document.getElementById("uv_index");
let pressure = document.getElementById("pressure");
let visibility = document.getElementById("visibility");

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    apiCall(input);
  }
});

async function apiCall(input) {
  let resWeather = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=df232fca05674ebfb0c95804251611&q=" +
      input.value +
      "&aqi=no"
  );
  let resForecast = await fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=df232fca05674ebfb0c95804251611&q=" +
      input.value +
      "&aqi=no"
  );

  let weatherData = await resWeather.json();
  let forecastData = await resForecast.json();

  console.log(weatherData);
  console.log(forecastData);

  weatherDetails(weatherData);
  forecastDetails(forecastData);
}

function weatherDetails(data) {
  city.innerText = data.location.name;
  country.innerText = data.location.country;

  let icon_url = "https:" + data.current.condition.icon;
  Weather_icon.src = icon_url;

  condition.innerText = data.current.condition.text;
  current_temp.innerText = data.current.temp_c + "℃";

  let localtime = data.location.localtime;
  let [datee, timee] = localtime.split(" ");
  let [year, month, day] = datee.split("-");
  let [hour, minute] = timee.split(":");

  date.innerText =
    findDay(year, month, day) +
    ", " +
    findMonth(month) +
    " " +
    day +
    ", " +
    year;
  let x = hour >= 12 ? "PM" : "AM";
  time.innerText = hour + " : " + minute + " " + x;

  wind_speed.innerText = data.current.wind_kph + " km/h";
  humidity.innerText = data.current.humidity + " %";
  cloud_cover.innerText = data.current.cloud + " %";

  let uv_value = data.current.uv == null ? "0" : data.current.uv;
  let uv_text =
    uv_value <= 2
      ? "Low"
      : uv_value <= 5
      ? "Moderate"
      : uv_value <= 7
      ? "High"
      : uv_value <= 10
      ? "Very High"
      : "Extreme";
  uv_index.innerText = uv_value + " (" + uv_text + ")";

  pressure.innerText = data.current.pressure_mb + " hPa";
  visibility.innerText = data.current.vis_km + " km";
}
function forecastDetails(data) {
  let forecast = data.forecast.forecastday[0].day;
  max_temp.innerText = forecast.maxtemp_c + "℃";
  min_temp.innerText = forecast.mintemp_c + "℃";

  let astro = data.forecast.forecastday[0].astro;

  let time = astro.sunrise;
  let [rise_hour, rise_minute] = time.split(":");
  sunrise.innerText = rise_hour + " : " + rise_minute;

  time = astro.sunset;
  [rise_hour, rise_minute] = time.split(":");
  sunset.innerText = rise_hour + " : " + rise_minute;
}

function findDay(y, m, d) {
  y = parseInt(y);
  m = parseInt(m);
  d = parseInt(d);

  let y0 = y - Math.floor((14 - m) / 12);
  let z = y0 + Math.floor(y0 / 4) - Math.floor(y0 / 100) + Math.floor(y0 / 400);
  let m0 = m + 12 * Math.floor((14 - m) / 12) - 2;
  let d0 = (d + z + Math.floor((31 * m0) / 12)) % 7;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[d0];
}
function findMonth(m) {
  let months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[m];
}
