const { getWeather, displayWeatherData, showWeather } = require("./index");
// import { getWeather, displayWeatherData, showWeather } from './index.js';

describe("Weather app:", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("getWeather()", () => {
    describe("should fetch weather data from API", () => {
      describe("when there is a successful API response", () => {
        const mockedData = {
          name: "Chennai",
          main: { temp: 20, humidity: 50 },
          wind: { speed: 10 },
          weather: [{ main: "Clouds" }],
        };

        beforeEach(() => {
          global.fetch = jest.fn().mockResolvedValue(mockedData);
        });

        test("it should display the weather", async () => {
          document.body.innerHTML = `
            <input id="city" value="Chennai">
            <div class="temp"></div>
            <div class="city"></div>
            <div class="humidity"></div>
            <div class="wind"></div>
            <img id="weather-img">
            <div class="error"></div>
            <div class="weather"></div>
          `;

          await showWeather();
          displayWeatherData(mockedData);

          expect(fetch).toHaveBeenCalledWith(
            "https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=224683afb327839fa35d0e7df7029bfd&units=metric"
          );

          expect(document.querySelector(".temp").innerHTML).toBe("20°C");
          expect(document.querySelector(".city").innerHTML).toBe("Chennai");
          expect(document.querySelector(".humidity").innerHTML).toBe("50%");
          expect(document.querySelector(".wind").innerHTML).toBe("10 Km/h");
          expect(document.querySelector("#weather-img").src).toContain(
            "clouds.png"
          );
          expect(document.querySelector(".error").style.display).toBe("none");
          expect(document.querySelector(".weather").style.display).toBe(
            "block"
          );
        });
      });

      describe("when there is an unsuccessful API response", () => {
        const error = new Error("weather data not availiable");

        beforeEach(() => {
          global.fetch = jest.fn().mockRejectedValue(error);
        });

        test("it should display the error", async () => {
          const invalidCity = "not valid";
          document.body.innerHTML = `
            <input id="city" value="${invalidCity}">
            <div class="temp"></div>
            <div class="city"></div>
            <div class="humidity"></div>
            <div class="wind"></div>
            <img id="weather-img">
            <div class="error"></div>
            <div class="weather"></div>
          `;

          await showWeather();

          expect(fetch).toHaveBeenCalledWith(
            `https://api.openweathermap.org/data/2.5/weather?q=${invalidCity}&appid=224683afb327839fa35d0e7df7029bfd&units=metric`
          );

          expect(document.querySelector(".error").innerHTML).toBe(
            "weather data not availiable"
          );
          expect(document.querySelector(".weather").style.display).toBe("none");
        });
      });
    });
  });
});
