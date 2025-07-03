const apiKey = '46ea4b5056e20e5650fa9252aaa544af';
const city = 'Marosvasarhely'; // or 'Targu Mures'

const weatherAnimations = {
    clear: 'animations/sunny.json',       // OpenWeatherMap "Clear"
    sunny: 'animations/sunny.json',
    clouds: 'animations/cloudy.json',     // OpenWeatherMap "Clouds"
    cloudy: 'animations/cloudy.json',
    rain: 'animations/rain.json',
    snow: 'animations/snow.json',
    thunderstorm: 'animations/storm.json', // OpenWeatherMap "Thunderstorm"
    storm: 'animations/storm.json',
};

async function fetchWeather() {
    try {
        // 1. Geocoding API to get coordinates
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.length) {
            console.error('Nem található hely a megadott névvel.');
            return;
        }

        const { lat, lon } = geoData[0];

        // 2. Weather API call with coordinates
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=hu`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        // Extract weather info
        const temp = Math.round(weatherData.main.temp);
        const description = weatherData.weather[0].description;
        const mainWeather = weatherData.weather[0].main.toLowerCase();

        // 3. Show weather text
        const weatherDiv = document.getElementById('weather');
        if (weatherDiv) {
            weatherDiv.innerHTML = `🌤 ${city}: ${temp}°C, ${description}`;
        }

        // 4. Load Lottie animation for weather
        const animContainer = document.getElementById('weather-animation');
        if (animContainer) {
            animContainer.innerHTML = ''; // clear previous animation

            const animationPath = weatherAnimations[mainWeather] || weatherAnimations['clear'];
            lottie.loadAnimation({
                container: animContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: animationPath,
            });
        }
    } catch (error) {
        console.error('Hiba az időjárás lekérésekor:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchWeather);
setInterval(fetchWeather, 600000); // Refresh every 10 minutes
