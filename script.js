document.getElementById('getWeather').addEventListener('click', function () {
    let city = document.getElementById('city').value;
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city');
    }
});

function getWeatherData(city) {
    const apiKey = '0ce49ee7895f7791f47c973d577bf919'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            displayMap(data.coord.lat, data.coord.lon);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('City not found');
        });
}

function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;

    document.getElementById('cityName').textContent = cityName;
    document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
    document.getElementById('description').textContent = `Description: ${description}`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
}

// Initialize the map with Leaflet.js
function displayMap(lat, lon) {
    const map = L.map('map').setView([lat, lon], 12); // Set map view to city coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add marker to map
    L.marker([lat, lon]).addTo(map)
        .bindPopup('Weather Location')
        .openPopup();
}
