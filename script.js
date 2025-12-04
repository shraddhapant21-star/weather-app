const apiKey = "c3057c114f9e6057a70055f00e6aaa07";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const weatherBox = document.querySelector(".weather");
  const loading = document.querySelector(".loading");
  const errorBox = document.querySelector(".error");

  // Show loading, hide previous weather & error
  loading.style.display = "block";
  weatherBox.classList.remove("show");
  weatherBox.style.display = "none";
  errorBox.style.display = "none";

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // If city not found
    if (response.status == 404) {
      loading.style.display = "none";
      errorBox.style.display = "block";
      return;
    }

    const data = await response.json();

    // Update UI
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".feels-like-text").innerHTML =
      "Feels Like " + Math.round(data.main.feels_like) + "°C";

    // Set icon
    if (data.weather[0].main == "Clouds") weatherIcon.src = "images/cloudy.png";
    else if (data.weather[0].main == "Clear") weatherIcon.src = "images/sunny.png";
    else if (data.weather[0].main == "Rain") weatherIcon.src = "images/rain.png";
    else if (data.weather[0].main == "Drizzle") weatherIcon.src = "images/drizzle.png";
    else if (data.weather[0].main == "Mist") weatherIcon.src = "images/mist.png";
    else if (data.weather[0].main == "Snow") weatherIcon.src = "images/snow.png";

    // Show weather with fade-in
    loading.style.display = "none";
    weatherBox.style.display = "block";
    setTimeout(() => weatherBox.classList.add("show"), 10);

  } catch (err) {
    console.error(err);
    loading.style.display = "none";
    errorBox.style.display = "block";
  }
}

searchBtn.addEventListener("click", ()=> {
checkWeather(searchBox.value);
})
searchBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

async function checkWeatherByLocation(lat, lon) {
  const weatherBox = document.querySelector(".weather");
  const loading = document.querySelector(".loading");
  const errorBox = document.querySelector(".error");

  loading.style.display = "block";
  weatherBox.classList.remove("show");
  weatherBox.style.display = "none";
  errorBox.style.display = "none";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) throw new Error("Failed to fetch location weather");

    const data = await response.json();

    // update weather info (same as checkWeather)
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".feels-like-text").innerHTML =
      "Feels Like " + Math.round(data.main.feels_like) + "°C";

    if (data.weather[0].main == "Clouds") weatherIcon.src = "images/cloudy.png";
    else if (data.weather[0].main == "Clear") weatherIcon.src = "images/sunny.png";
    else if (data.weather[0].main == "Rain") weatherIcon.src = "images/rain.png";
    else if (data.weather[0].main == "Drizzle") weatherIcon.src = "images/drizzle.png";
    else if (data.weather[0].main == "Mist") weatherIcon.src = "images/mist.png";
    else if (data.weather[0].main == "Snow") weatherIcon.src = "images/snow.png";

    loading.style.display = "none";
    weatherBox.style.display = "block";
    setTimeout(() => weatherBox.classList.add("show"), 10);

  } catch (err) {
    console.error(err);
    loading.style.display = "none";
    errorBox.style.display = "block";
  }
}

window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        checkWeatherByLocation(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      () => {
        console.log("Location permission denied");
        checkWeather("New York"); // default city
      }
    );
  } else {
    // Geolocation not supported
    checkWeather("New York");
  }
};

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
});


