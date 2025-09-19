const fs = require('fs');
const fetch = require('node-fetch');

async function getWeather(city) {
    try {
        console.log('Reading API key...');
        const api_key = fs.readFileSync(__dirname + '/key.env', 'utf-8').trim();    
        console.log('API key loaded, length:', api_key.length);
        console.log('Fetching weather for city:', city);
        
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric&lang=de`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric&lang=de`;
        
        console.log('Current URL:', currentUrl);
        console.log('Forecast URL:', forecastUrl);

        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            return { error: 'City not found' };
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        const dailyForecast = [];
        if (forecastData && forecastData.list) {
            let daysAdded = 0;
            let lastDay = '';

            for (const item of forecastData.list) {
                const date = new Date(item.dt * 1000).toISOString().split('T')[0];
                let dayName = '';

               switch (daysAdded) {
                    case 0: dayName = 'Heute'; break;
                    case 1: dayName = 'Morgen'; break;
                    case 2: dayName = 'Übermorgen'; break;
                    default: dayName = new Date(item.dt * 1000).toLocaleDateString('de-DE', { weekday: 'short' }); break;
                }

                if (date !== lastDay && item.dt_txt.includes('12:00:00')) {
                    dailyForecast.push({
                        datum: dayName,
                        temperatur: Math.round(item.main.temp) + '°C',
                        beschreibung: capitalize(item.weather[0].description)
                    });
                    lastDay = date;
                    daysAdded++;
                    
                    if (daysAdded >= 5) break;
                }
            }
        }

        return {
            stadt: currentData.name,
            temperatur: Math.round(currentData.main.temp) + '°C',
            beschreibung: capitalize(currentData.weather[0].description),
            gefuehlt: 'Gefühlt: ' + Math.round(currentData.main.feels_like) + '°C',
            luftfeuchtigkeit: currentData.main.humidity + '%',
            windgeschwindigkeit: currentData.wind.speed + ' m/s',
            '5_tages_vorhersage': dailyForecast
        };
    } catch (error) {
        console.error('Error reading weather data:', error);
        return { error: 'Could not read weather data' };
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = { getWeather };