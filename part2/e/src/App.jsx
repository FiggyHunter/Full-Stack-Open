import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [allCountries, setAllCountries] = useState({});
  const [country, setCountry] = useState("");
  const [displayedCountries, setDisplayedCountries] = useState({});

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

  const handleChange = (e) => {
    setCountry(e.target.value);
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
        <input value={country} onChange={handleChange}></input>
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
