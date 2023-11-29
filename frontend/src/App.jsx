import React, { useState } from "react";
import "./App.css";
import Error from "./Components/Error.jsx";
import CountryData from "./Components/CountryData.jsx";
import Header from "./Components/Header.jsx";
import { Puff } from "react-loader-spinner";

const LoadingStates = {
  // initialises constant to be used with loading useState
  Idle: "idle",
  Loading: "loading",
  Loaded: "loaded",
  Error: "error",
};

function App() {
  // initialises useStates
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(LoadingStates.Idle);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    // sets country to input value
    // & handles API restriction on China
    if (event.target.value.toLowerCase() === "china") {
      setCountry("cn");
    } else {
      setCountry(event.target.value);
    }
  };

  const handleError = (event) => {
    // dismisses error when button pressed
    setError(null);
  };

  const handleFetchCountryData = async () => {
    // clears error status and country data
    setError(null);
    setCountryData(null);
    // updates loading status to 'loading'
    setLoading(LoadingStates.Loading);

    try {
      // sends api request to server
      const response = await fetch("http://localhost:8080/country-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country }),
      });
      // catches error
      if (!response.ok) {
        setError({
            message: `You entered "${country}". Please enter a valid country name. `,
        });
        throw new Error();
        } 
      // gets country data from server
      const data = await response.json();
      setCountryData(data);
      // updates loading status to 'loaded'
      setLoading(LoadingStates.Loaded);
      // catches errors and sends error message
    } catch (error) {
      // updates loading status to 'error'
      setLoading(LoadingStates.Error);
    } finally {
      // clears input box
      setCountry("");
    }
  };

  return (
    <div className="app">
      <Header />
      <input
        type="text"
        placeholder="Enter country"
        value={country}
        required
        onChange={handleInputChange}
      />
      <button onClick={handleFetchCountryData}>Get Country Info</button>

      {loading === LoadingStates.Loading && (
        <div className="loader">
          <Puff color="white" />
        </div>
      )}

      {error && (
        <Error
          title="Oh no, an error!"
          errorMessage={error.message}
          onConfirm={handleError}
        />
      )}

      {countryData && <CountryData data={countryData} />}
    </div>
  );
}

export default App;
