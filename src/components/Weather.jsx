import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import icon from './img/weather-forecast.png'

function Weather() {
  const [query, setQuery] = useState();
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDate = () => {
    // let date = new Date();
    // const today = date.toDateString();
    // return today;
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'Nocvember',
      'December',
    ];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setQuery('');
      setWeather({ ...weather, loading: true });
      const url = 'https://api.openweathermap.org/data/2.5/weather';
      const appid = 'f00c38e0279b7bc85480c3fe775d518c';
      
      // const url = 'https://api.openweathermap.org/data/2.5/weather';
      // const appid = '9217b8bd1c644e668563fee22875f681';
      //console.log('Enter');

      await axios
        .get(url, {
          params: {
            q: query,
            units: 'metric',
            appid: appid,
          },
        })
        .then((res) => {
          console.log('res', res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setQuery('');
          console.log('error', error);
        });
    }
  };

  return (
    <div>
      <h1 className="app-name">
      <img src={icon} alt="weather-forecast" width="64px" height="64px" style={{ marginRight: "10px" }}/>
      Meteorology App
      </h1>
      
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Search City.."
          name="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyPress={search}
        />
      </div>

      {weather.loading && (
        <>
          <br />
          <br />
          <Loader type="Oval" color="black" height={100} width={100} />
        </>
      )}
      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ 'font-size': '20px' }}> Sorry, City not found</span>
          </span>
        </>
      )}

      {weather && weather.data && weather.data.main && (
        <div>
          <div className="city-name">
            <h2>
              {weather.data.name.toUpperCase()}
            </h2>
          </div>
          <div>          
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            </div>
          <div className="icon-temp">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
              width="150px" height="150px"
            />
          </div>
          <div  className="container">
          <div className="des-wind">
            <p><strong>Temprature </strong>{weather.data.main.temp}&deg;C</p>
          </div>
          <div className="des-wind">
            <p><strong>Wind Speed </strong>{weather.data.wind.speed}m/s</p>
          </div>
          <div className="des-wind">
            <p><strong>Humidity</strong> {weather.data.main.humidity}%</p>
          </div>
          <div className="des-wind">
            <p><strong>Visibility</strong> {weather.data.visibility}km</p>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
