import './App.css';
import rain from './img/rain.png';
import snow from './img/snow.png';
import sunny from './img/sunny.png';
import sunnyclouds from './img/sunnyclouds.png';
import thunder from './img/thunder.png';
import cloudy from './img/clouds.png';
import mist from './img/mist.png';
import { useState } from 'react';
import FiveDaysForecast from './components/5days';
import Aktuell from './components/aktuell';
import WeatherUI from './components/wetterui';

function App() {
  const [stadt, setStadt] = useState('');
  const [land, setLand] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('aktuell');

  const wetterimg = {
    'Klar': sunny,
    'Wenige wolken': sunnyclouds,
    'Überwiegend bewölkt': cloudy,
    'Regen': rain,
    'Leichter Regen': rain,
    'Gewitter': thunder,
    'Schnee': snow,
    'Nebel': mist,
    'Klarer Himmel': sunny,
    'default': cloudy
  }

  function wetterHolen() {
    if (!stadt) {
      setError('Bitte gib eine Stadt ein!');
      return;
    }
    setError(null);
    const cityQuery = land ? `${stadt},${land}` : stadt;
    fetch(`http://localhost:8000/backend/api.php?city=${encodeURIComponent(cityQuery)}&country=${encodeURIComponent(land)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Komplette API-Antwort:', data);
        if (data.fehler) {
          setError(data.fehler);
          setWeatherData(null);
        } else {
          setWeatherData(data);
          setError(null);
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(`Verbindungsfehler: ${error.message}`);
        setWeatherData(null);
      });
  }
  return (
    <div>
      <WeatherUI 
        stadt={stadt} 
        setStadt={setStadt} 
        land={land} 
        setLand={setLand} 
        wetterHolen={wetterHolen} 
        error={error}
        weatherData={weatherData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        wetterimg={wetterimg}
        Aktuell={Aktuell}
        FiveDaysForecast={FiveDaysForecast}
      />
    </div>
  );
}

export default App;