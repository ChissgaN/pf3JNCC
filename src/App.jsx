import { useEffect, useState } from "react";
import { Search } from "./components/Search";
import {
  getForeca,
  getForecaLocations,
  getWeather,
  getWeatherLocations,
} from "./scripts/fetch";
import { saveLocalStorage } from "./scripts/localStorage";
import TodayWeather from "./components/TodaysWeather";
import Temp from "./components/Temperature";
import Weak from "./components/Weak";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

function App() {
  const [weatherData, setWeatherData] = useState({
    temp: 0,
    dateFormat: "",
    windStatus: 0,
    humidity: 0,
    airPressure: 0,
    visibilityMiles: 0,
    weather: "",
    locationName: "",
  });

  const [forecastData, setForecastData] = useState({});
  const [keys, setKeys] = useState([]);

  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [isMph, setIsMph] = useState(false);


  const changeWeather = (data) => {
    const { weather, main, visibility, wind, name } = data;
    const date = new Date();
    const dateOptions = { weekday: "short", day: "numeric", month: "short" };

    setWeatherData({
      weather: weather.main ?? "Shower",
      temp: Math.round(main?.temp ?? 0),
      dateFormat: date.toLocaleDateString("en-US", dateOptions),
      windStatus: Math.round(wind?.speed ?? 0),
      humidity: Math.round(main?.humidity ?? 0),
      airPressure: main?.pressure ?? 0,
      visibilityMiles: visibility ? visibility / 1609.34 : 0,
      weather: weather[0]?.main ?? "Shower",
      locationName: name,
    });
    const progress = document.getElementById("progress");
    const windStatus = document.getElementById("windStatus");
    progress.style.width = Math.round(main?.humidity ?? 0) + "%";
    windStatus.style.transform = `rotate(${wind.deg}deg)`;
  };

  const changeFahreorecast = (data) => {
    const dailyForeca = [];

    
    data.list.forEach((segment) => {
      const dateText = segment.dt_txt;
      const dateDay = new Date(dateText);
      const day = dateDay.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      
      if (!dailyForeca[day]) {
        dailyForeca[day] = {
          minTemp: segment.main.temp,
          maxTemp: segment.main.temp,
          weather: segment.weather[0].main,
        };
      } else {
        
        dailyForeca[day].minTemp = Math.min(
          dailyForeca[day].minTemp,
          segment.main.temp
        );
        dailyForeca[day].maxTemp = Math.max(
          dailyForeca[day].maxTemp,
          segment.main.temp
        );
      }
    });
    const dayKeys = Object.keys(dailyForeca);
    setForecastData(dailyForeca);
    setKeys(dayKeys);
  };

  const cords = () => {
    
    if ("geolocation" in navigator) {
      
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        
        getWeatherLocations(lat, lon).then((data) => changeWeather(data));
        getForecaLocations(lat, lon).then((data) => changeFahreorecast(data));
      });
    } else {
    }
  };

  const inputSearch = (place) => {
    saveLocalStorage(place);
    getWeather(place).then((data) => changeWeather(data));
    getForeca(place).then((data) => changeFahreorecast(data));
  };

  const changeFahre = () => {
    setIsFahrenheit(true);
    setIsMph(true)
  };

  const changeCels = () => {
    setIsFahrenheit(false);
    setIsMph(false)
  };
  
  useEffect(() => {
    getWeather("guatemala").then((data) => changeWeather(data));
    getForeca("guatemala").then((data) => changeFahreorecast(data));
  }, []);

  return (
    <main className="max-w-8xl mx-auto w-[100%]
    md:flex
    ">
      <div className="w-[100%] relative h-[990px]
      md:fixed md:top-0 md:bottom-0 md:left-0 md:w-[400px]
      ">
        <Search inputSearch={inputSearch} cords={cords} />
        <Sidebar weatherData={weatherData} isFahrenheit={isFahrenheit} />

      </div>

      <section className="md:flex-1 md:pl-[400px] md:m-20">
        <Temp changeFahre={changeFahre} changeCels={changeCels} />
        <Weak
          keys={keys}
          forecastData={forecastData}
          isFahrenheit={isFahrenheit}
        />
        <TodayWeather weatherData={weatherData}
        isMph={isMph}
         />

        <Footer/>
      </section>
    </main>
  );
}

export default App;
