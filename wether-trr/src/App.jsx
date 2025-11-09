import { useState } from "react";
import "./App.css";

function App() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState(null);

  const getData = async (event) => {
    event.preventDefault();    

    let apiKey = "5b6c8654e823461f86b105902252708"; 
    let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    let res = await fetch(url);
    let finalRes = await res.json();
    if(finalRes.code=="404"){
      setWeather(undefined)
    }
    else{
   setWeather(finalRes);
    }
    

    setCity(""); 
  };

  return (
    <div className="weather">
      <h1>🌦 Weather App</h1>

      <form onSubmit={getData}>
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {weather && (
        <div className="Backgrnd">
          <ul>
            <li>{weather.location.name}</li> 
            <li>{weather.current.temp_c} °C</li>
            <li>{weather.current.condition.text}</li>
            <li>
              <img src={weather.current.condition.icon} alt="icon" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
