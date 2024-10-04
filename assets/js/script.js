

// *****THIS WAS WORKED ON IN A GROUP IN CLASS******


// Define the API key for OpenWeatherMap
// Signup link: https://home.openweathermap.org/users/sign_up
// Signin link: https://home.openweathermap.org/users/sign_in
// TODO: Replace 'YOUR_API_KEY' with your actual API key
const API_KEY = '83c450acdd6a763235afe012c38bb5d5'; 

// Get references to necessary DOM elements (e.g., search input, buttons, weather display areas)
// TODO: Replace the 'INSERT_ID_HERE' with the appropriate selector for the DOM elements below
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const currentWeatherDisplay = document.getElementById('current-weather');
const forecastDisplay = document.getElementById('forecast-display');
const searchHistory = document.getElementById('search-history');

// Fetch the coordinates (latitude and longitude) of a city using the OpenWeatherMap Geocoding API
// TODO: Complete the getCoordinates method. 
function getCoordinates(cityName) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    return fetch(geoUrl)
        // TODO: Convert the API response from a raw format (such as text or blob) into a JavaScript object using the .json() method.
        .then(response =>{
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);
            if (data.length === 0) {
                throw new Error('City not found');
            }
            return {
                // TODO: Extract the latitude and longitude from the first result in the returned data array (check console).
                lat: data[0].lat,
                lon: data[0].lon,
            };
        })
        // TODO: Handle any errors that occur during the API request or response parsing.
        .catch( err =>{
            alert('Error: ' + err.message);
            return;
        });
}

// Fetch the weather data using the coordinates
// TODO: Complete the getWeather method by filling in the .then(s)
function getWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    return fetch(weatherUrl)
        // TODO: Convert the API response into a JSON object using .json() to allow handling of the data in JavaScript.
        .then(response =>{
            return response.json();
        })
        // TODO: Return the parsed data in the second .then() so that it can be used in the next steps of the promise chain for further processing.
        .then(data =>{
            return data;
        });
}

// Display the current weather data
// TODO: Use the 'Current Weather Data' in the console to complete the displayCurrentWeather method
function displayCurrentWeather(data) {
    console.log('Current Weather Data', data);
    const currentWeather = data.list[0];
    const city = data.city.name;
    const date = new Date(currentWeather.dt * 1000).toLocaleDateString();
    const temperature = currentWeather.main.temp;
    const humidity = currentWeather.main.humidity;
    const windSpeed = currentWeather.wind.speed;
    const weatherIcon = `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;

    currentWeatherDisplay.innerHTML = `
        <h2>${city} (${date})</h2>
        <img src="${weatherIcon}" alt="Weather Icon">
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}



// Display the 5-day weather forecast
// TODO: Use the '5-day Weather Data' in the console to complete the displayForecast method
function displayForecast(data) {
    console.log('5-day Weather Data', data);
    forecastDisplay.innerHTML = '';
    for (let i = 0; i < data.list.length; i += 8) { // The API provides data every 3 hours, so skip 8 (24-hour intervals)
        const forecastItem = data.list[i];
        const date = new Date(forecastItem.dt * 1000).toLocaleDateString();
        const temperature = forecastItem.main.temp;
        const humidity = forecastItem.main.humidity;
        const windSpeed = forecastItem.wind.speed;
        const weatherIcon = `http://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`;

        forecastDisplay.innerHTML += `
            <div class="forecast-item">
                <h4>${date}</h4>
                <img src="${weatherIcon}" alt="Weather Icon">
                <p>Temp: ${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            </div>
        `;
    }
}

// Update and store search history in localStorage
function updateSearchHistory(city) {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    // TODO: Check if the city already exists in the search history
    if(!history.includes(city)){
    // If the city does not exist, add it to the history array, 
    // then update the localStorage with the new history and re-render the search history.

        history.push(city);
        localStorage.setItem('history', JSON.stringify(history));
        displaySearchHistory();
    }
   
}

// Display search history from localStorage on page load
function displaySearchHistory() {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    searchHistory.innerHTML = '';  
    // TODO: Iterate through the search history array and create a list item (li) for each city.
    // Set the text content of the li to the city name.
    // Add a click event listener to each li, so when a city is clicked, the weather data for that city is fetched.
    // The event listener fetches coordinates using getCoordinates(), then fetches the weather data with those coordinates,
    // and finally displays the current weather and 5-day forecast using displayCurrentWeather() and displayForecast().
    // Append each li element to the searchHistory DOM element to display the list of searched cities.
    history.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        li.addEventListener('click', () =>{
            getCoordinates(city)
            // Fetch weather data using the coordinates
            .then(coords => getWeather(coords.lat, coords.lon))
            .then(weatherData => {
                // TODO: Display the current weather
                displayCurrentWeather(weatherData)
                // TODO: Display the 5-day forecast
                displayForecast(weatherData)
            })
        })
        searchHistory.appendChild(li);
    });
}

// Event listener for the search button to trigger the weather search and display
// TODO: Complete the search button event listener
searchBtn.addEventListener('click', () => {
    // TODO: Get the city name from the input field
    const city = cityInput.value.trim();
    // TODO: If the input field is empty, return
    if(city === ''){
        return;
    }
    // Fetch the city coordinates and then get the weather data
    getCoordinates(city)
        // Fetch weather data using the coordinates
        .then(coords => getWeather(coords.lat, coords.lon))
        .then(weatherData => {
            // TODO: Display the current weather
            displayCurrentWeather(weatherData)
            // TODO: Display the 5-day forecast
            displayForecast(weatherData)
            // TODO: Update the search history
            updateSearchHistory(weatherData.city.name)
        })
        // TODO: Error handling  
        .catch(err => alert(err.message))
});

// TODO: Call the displaySearchHistory function on page load to show saved search history
displaySearchHistory();

