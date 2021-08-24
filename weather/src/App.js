
import React from "react"
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import './App.css';

function App() {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '8a2401c943585264733eb3beb1368e1d',
    lat: '1.2921',
    lon: '36.8219',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });

  return (
    <div className="App">
      <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel="Ahmednagar"
        unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
        showForecast
      />
    </div>
  );
}

export default App;
