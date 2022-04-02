let now = new Date();
let h2 = document.querySelector("h2");
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h2.innerHTML = day + " " + hour + ":" + minutes;

function showWeather(response) {
  console.log(response.data);
  let submittedCity = document.querySelector("#city");
  let temp = document.querySelector("#current-temp");
  let humidity = document.querySelector("#humid");
  let wind = document.querySelector("#wind");
  let maxTemp = document.querySelector("#max-temp");
  let minTemp = document.querySelector("#min-temp");
  let mainIcon = document.querySelector("#main-icon");
  submittedCity.innerHTML = response.data.name;
  temp.innerHTML = `${Math.round(response.data.main.temp)}°`;
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  mainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let apiKey = "986838f19f5afa856e8061bfe8e9bfa7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showLocation(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let apiKey = "986838f19f5afa856e8061bfe8e9bfa7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", currentLocation);

function fLink(event) {
  event.preventDefault();
  let fUnit = document.querySelector("#current-temp");
  fUnit.innerHTML = "82°";
}
let unitChangeF = document.querySelector("#fahrenheit");
unitChangeF.addEventListener("click", fLink);

function cLink(event) {
  event.preventDefault();
  let cUnit = document.querySelector("#current-temp");
  cUnit.innerHTML = "28°";
}
let unitChangeC = document.querySelector("#celsius");
unitChangeC.addEventListener("click", cLink);

searchCity("Sydney");
