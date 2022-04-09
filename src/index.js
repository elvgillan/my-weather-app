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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
              <div class="weather-forecast-day">${day}</div>
              <img
                src="http://openweathermap.org/img/wn/02d@2x.png"
                alt="weather condition"
                width="42"
              />
              <br />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperatures-high">18°</span>
                | <span class="weather-forecast-temperatures-low">12°</span>
              </div>
            </div>
            `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  console.log(response.data);
  let submittedCity = document.querySelector("#city");
  let condition = document.querySelector("#condition");
  let temp = document.querySelector("#current-temp");
  let humidity = document.querySelector("#humid");
  let wind = document.querySelector("#wind");
  let maxTemp = document.querySelector("#max-temp");
  let minTemp = document.querySelector("#min-temp");
  let mainIcon = document.querySelector("#main-icon");
  celsiusTemp = response.data.main.temp;
  maxCelsiusTemp = response.data.main.temp_max;
  minCelsiusTemp = response.data.main.temp_min;
  condition.innerHTML = response.data.weather[0].main;
  submittedCity.innerHTML = response.data.name;
  temp.innerHTML = Math.round(celsiusTemp);
  maxTemp.innerHTML = Math.round(maxCelsiusTemp);
  minTemp.innerHTML = Math.round(minCelsiusTemp);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  mainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainIcon.setAttribute("alt", response.data.weather[0].description);
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

function fLink(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let fUnit = document.querySelector("#current-temp");
  let fahrenheitMaxTemp = (maxCelsiusTemp * 9) / 5 + 32;
  let fUnitMax = document.querySelector("#max-temp");
  let fahrenheitMinTemp = (minCelsiusTemp * 9) / 5 + 32;
  let fUnitMin = document.querySelector("#min-temp");
  unitChangeC.classList.remove("active");
  unitChangeF.classList.add("active");
  fUnit.innerHTML = Math.round(fahrenheitTemp);
  fUnitMax.innerHTML = Math.round(fahrenheitMaxTemp);
  fUnitMin.innerHTML = Math.round(fahrenheitMinTemp);
}
let unitChangeF = document.querySelector("#fahrenheit");
unitChangeF.addEventListener("click", fLink);

function cLink(event) {
  event.preventDefault();
  let cUnit = document.querySelector("#current-temp");
  let cUnitMax = document.querySelector("#max-temp");
  let cUnitMin = document.querySelector("#min-temp");
  unitChangeC.classList.add("active");
  unitChangeF.classList.remove("active");
  cUnit.innerHTML = Math.round(celsiusTemp);

  cUnitMax.innerHTML = Math.round(maxCelsiusTemp);
  cUnitMin.innerHTML = Math.round(minCelsiusTemp);
}
let unitChangeC = document.querySelector("#celsius");
unitChangeC.addEventListener("click", cLink);

let celsiusTemp = null;
let maxCelsiusTemp = null;
let minCelsiusTemp = null;

searchCity("Sydney");
displayForecast();
