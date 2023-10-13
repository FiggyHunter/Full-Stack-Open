import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [allCountries, setAllCountries] = useState({});
  const [country, setCountry] = useState("");
  const [displayedCountries, setDisplayedCountries] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [tempCountry, setTempCountry] = useState("");
  useEffect(() => {
    const debouncingDelay = setTimeout(() => {
      if (country !== tempCountry) setCountry(tempCountry);
    }, 500);
    return () => {
      clearTimeout(debouncingDelay);
    };
  }, [tempCountry]);

  useEffect(() => {
    Axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then(
      (response) => {
        setAllCountries(response.data);
      }
    );
  }, []);

  useEffect(() => {
    if (Object.keys(allCountries).length !== 0) {
      filterCountries();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  useEffect(() => {
    if (displayedCountries.length === 1)
      Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          displayedCountries[0].capital
        }&appid=${import.meta.env.VITE_WEATHER_API}&units=metric`
      ).then((res) => {
        setWeatherData(res.data);
      });
  }, [displayedCountries]);

  const handleChange = (e) => {
    setTempCountry(e.target.value);
  };

  const filterCountries = () => {
    setDisplayedCountries(
      allCountries.filter((searchedCountry) =>
        searchedCountry.name.common
          .toLowerCase()
          .includes(country.toLowerCase())
      )
    );
  };

  return (
    <>
      <div className="country-finder">
        <p>Find countries: </p>
        <input value={tempCountry} onChange={handleChange}></input>
        <h2>Countries:</h2>
        <>
          {displayedCountries.length > 1 &&
            displayedCountries.length < 10 &&
            displayedCountries?.map((country) => (
              <div key={country.name.common}>
                <p id="country-name">{country.name.common}</p>
                <button
                  onClick={() => {
                    setCountry(country.name.common);
                  }}
                >
                  Show {country.name.common}
                </button>
              </div>
            ))}

          {displayedCountries.length === 1 &&
            displayedCountries?.map((displayedCountry) => (
              <div key={displayedCountry.name.common} className="country">
                <h3>{displayedCountry.name.common}</h3>
                <p>Capital City: {displayedCountry.capital}</p>
                <h4>Languages:</h4>
                {Object.values(displayedCountry.languages).map(
                  (value, index) => (
                    <ul key={index}>
                      <li>{value}</li>
                    </ul>
                  )
                )}
                <img src={displayedCountry.flags.png}></img>
                <h3>Weather in {displayedCountry.capital}</h3>
                {Object.keys(weatherData).length !== 0 && (
                  <div className="weather-data">
                    <p>{weatherData.main.temp} Celcius</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    />
                    <p>Wind: {weatherData.wind.speed} m/s</p>
                  </div>
                )}
              </div>
            ))}

          {displayedCountries.length > 10 && (
            <p>Too many matches, please specify another filter! </p>
          )}
        </>
      </div>
    </>
  );
}

export default App;
