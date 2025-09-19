const express = require('express');
const {getWeather} = require('./weather.js');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Content-Type', 'application/json');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.get('/', async (req, res) => {
    const city = req.query.city || 'Berlin';
    console.log('Received request for city:', city);
    const weatherData = await getWeather(city);
    console.log('Weather data:', weatherData);
    res.json(weatherData);
});

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
