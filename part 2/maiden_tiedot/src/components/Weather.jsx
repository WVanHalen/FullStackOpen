import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ lat, lon }) => {
  const api_key = import.meta.env.VITE_SOME_KEY;

  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);
        console.log(response.data);
      })
      .catch((error) =>
        console.log("Virhe säätietojen haussa.", error.response.data.message)
      );
  }, []);

  console.log(weatherData);

  return (
    <>
      {weatherData.main ? (
        <div>
          <p>temperature {weatherData.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          />
          <p>wind {weatherData.wind.speed} m/s</p>
        </div>
      ) : null}
    </>
  );
};

export default Weather;
