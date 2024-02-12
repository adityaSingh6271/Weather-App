// Select the search input field and the search button
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

// Function to fetch weather data
const fetchWeatherData = async (city) => {
    const apiKey = '666f582acemsh0fe3fb6b67539dep12dc97jsn05da2d9b7ffa';

    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${encodeURIComponent(city)}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Weather data:', data);
        updateWeatherUI(data, city); // Pass city name to updateWeatherUI
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

// Function to update UI with weather data
const updateWeatherUI = (data, city) => {
    // Update city name
    document.querySelector(".City").innerHTML = city;
    
    // Update temperature
    document.querySelector(".temp").innerHTML = `${data.temp}°C`;
    
    // Update humidity
    document.querySelector(".humidity").innerHTML = `${data.humidity}%`;

    // Update wind speed
    document.querySelector(".wind").innerHTML = `${data.wind_speed} km/h`;
};

// Function to handle search
const handleSearch = async () => {
    // Get the value entered by the user in the search input field
    const city = searchBox.value.trim();
    
    // Check if the input is not empty
    if (city) {
        try {
            // Fetch weather data for the entered city
            await fetchWeatherData(city);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    } else {
        alert('Please enter a city name.'); // Display an alert if the input is empty
    }
};

// Add an event listener to the search button
searchBtn.addEventListener('click', handleSearch);

// Add an event listener to the search input field to handle pressing Enter
searchBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

// Specify the default city for which you want to fetch weather data
const defaultCity = 'Mumbai';
fetchWeatherData(defaultCity);
