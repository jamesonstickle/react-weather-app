import React, { useState, useEffect } from "react";
import Conditions from "./Conditions/Conditions.js";
const Forecast = () => {
  let [responseObj, setResponseObj] = useState({});
  let [city, setCity] = useState("");
  let [unit, setUnit] = useState("metric");
  const uriEncodedCity = encodeURIComponent(city);
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  useEffect(() => {
    if (!photoUrl) {
      fetchPhotoUrl();
    }
  }, [responseObj]);
  const fetchPhotoUrl = async () => {
    const city = document.getElementById("cityName").value;
    if (!city) return;
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=pageimages&format=json&redirects=1&piprop=original&titles=` +
        city +
        `&indexpageids=true`
    );
    const data = await response.json();
    const inputId = data.query.pageids[0];
    const imgSrc = data.query.pages[inputId].original;
    document.getElementById("cityImg").src = imgSrc.source;
  };

  function getForecast(e) {
    e.preventDefault();
    if (city.length === 0) {
      return setError(true);
    }

    setError(false);
    setResponseObj({});
    setLoading(true);

    let uriEncodedCity = encodeURIComponent(city);

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
      },
    };

    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.cod !== 200) {
          throw new Error();
        }
        setResponseObj(response);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err.message);
      });
  }
  return (
    <div>
      <h2>Find Current Weather Conditions</h2>
      <form
        className="shadow-md w-1/2 mx-auto rounded px-8 pt-4 pb-4 mb-4"
        onSubmit={getForecast}
      >
        <input
          className="shadow appearance-none border rounded w-1/3 py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="cityName"
          type="text"
          placeholder="Enter City"
          maxLength="50"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="flex justify-center m-4">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input inline-block appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              id="cRadio"
              type="radio"
              name="units"
              checked={unit === "metric"}
              value="metric"
              onChange={(e) => setUnit(e.target.value)}
            />
            <label
              className="form-check-label form-check-inline  mr-4"
              htmlFor="cRadio"
            >
              Celsius
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              className="form-check-input form-check-inline-block appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              id="fRadio"
              type="radio"
              name="units"
              checked={unit === "imperial"}
              value="imperial"
              onChange={(e) => setUnit(e.target.value)}
            />
            <label
              className="form-check-label inline-block"
              htmlFor="fRadio"
            >
              Fahrenheit
            </label>
          </div>
        </div>
        <button
          type="submit"
          id="weatherBtn"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Get Current Weather
        </button>
      </form>
      <Conditions responseObj={responseObj} error={error} loading={loading} />
      <div className="imgContainer">
        <img className="mx-auto pb-8 shadow-xl" id="cityImg" />
      </div>
    </div>
  );
};
export default Forecast;
