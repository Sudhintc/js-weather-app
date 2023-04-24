const getWeather = async () => {
  const apiKey = "224683afb327839fa35d0e7df7029bfd";
  const city = document.getElementById("city").value;
  const sanitizedCity = city.replace(/[^a-z A-Z]/g);
  // console.log(sanitizedCity);
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${sanitizedCity}&appid=${apiKey}&units=metric`;
  try {
    const weather = await fetch(apiUrl);
    if (weather.status !== 200) {
      throw new Error("weather data not found");
    } else {
      const data = await weather.json();
      console.log(data);
      displayWeatherData(data);
    }
  } catch (error) {
    document.querySelector(".error").innerHTML = "weather data not availiable";
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    console.log(error);
  }
};

const getWeatherImg = (weatherMain) => {
  const weatherImages = {
    Clouds: "images/clouds.png",
    Clear: "images/clear.png",
    Rain: "images/rain.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
  };
  return weatherImages[weatherMain];
};

function displayWeatherData(data) {
  const weatherImg = document.querySelector("#weather-img");
  if (
    data.main.temp &&
    data.name &&
    data.main.humidity &&
    data.wind.speed &&
    data.weather
  ) {
    document.querySelector(".temp").innerHTML =
      Math.floor(data.main.temp) + "°C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      Math.floor(data.wind.speed) + " Km/h";

    const weatherMain = data.weather[0].main;
    weatherImg.src = getWeatherImg(weatherMain);
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";

    console.log(data.weather);
  } else {
    console.log("error");
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}
// const btn = document.getElementById("btn");
// btn.addEventListener("click", getWeather);

module.exports = {
  getWeather,
  displayWeatherData,
};
