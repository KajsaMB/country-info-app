import React from "react";
import "./CountryData.css";

export default function CountryData({ data }) {
  // Maps languages
  const languages = Object.keys(data.languages).map((key) => (
    <li key={key}>{data.languages[key]}</li>
  ));

  // Maps currencies and currency symbols
  const currencies = Object.keys(data.currencies).map((key) => (
    <>
      <li key={key}>{data.currencies[key].name}</li>( {key} |{" "}
      {data.currencies[key].symbol} )
    </>
  ));

  return (
    // returns country data as a table
    <div className="country-info-box">
      <h2>{data.name.common}</h2>
      <p>
        <img src={data.flags.png} alt={`${data.name.common} Flag`} />
      </p>
      <table>
        <tbody>
          <tr>
            <td className="title">Capital:</td>
            <td>{data.capital}</td>
          </tr>
          <tr>
            <td className="title">Population:</td>
            <td>{Intl.NumberFormat().format(data.population)}</td>
          </tr>
          <tr>
            <td className="title">Area:</td>
            <td>{Intl.NumberFormat().format(data.area)} sq km</td>
          </tr>
          <tr>
            <td className="title">Region:</td>
            <td>{data.region}</td>
          </tr>
          <tr>
            <td className="title">Subregion:</td>
            <td>{data.subregion}</td>
          </tr>
          <tr>
            <td className="title">Languages:</td>
            <td>{languages}</td>
          </tr>
          <tr>
            <td className="title">Currency:</td>
            <td>{currencies}</td>
          </tr>
          <tr>
            <td className="title">UTC Timezone:</td>
            <td>{data.timezones[0]}</td>
          </tr>
          <tr>
            <td className="title">Top-Level Domain:</td>
            <td>{data.tld[0]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
