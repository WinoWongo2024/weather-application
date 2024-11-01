// Sample weather data for each location on the map
const weatherData = {
    "Chelsea": {
        condition: "Partly Cloudy",
        temp: "16°C",
        humidity: "50%",
        wind: "12 km/h"
    },
    "Canary Wharf": {
        condition: "Cloudy",
        temp: "14°C",
        humidity: "60%",
        wind: "10 km/h"
    },
    "Ruislip": {
        condition: "Sunny",
        temp: "20°C",
        humidity: "40%",
        wind: "5 km/h"
    },
    "Westminster": {
        condition: "Rainy",
        temp: "13°C",
        humidity: "75%",
        wind: "15 km/h"
    },
    "Canning Town": {
        condition: "Overcast",
        temp: "15°C",
        humidity: "70%",
        wind: "8 km/h"
    },
    "Heathrow": {
        condition: "Foggy",
        temp: "12°C",
        humidity: "85%",
        wind: "5 km/h"
    },
    "Royal Docks": {
        condition: "Showers",
        temp: "13°C",
        humidity: "80%",
        wind: "18 km/h"
    },
    "Isle of Dogs": {
        condition: "Clear",
        temp: "18°C",
        humidity: "65%",
        wind: "6 km/h"
    }
};

// Function to display weather information for a selected location
function showWeather(location) {
    const data = weatherData[location];

    // Check if data for the selected location exists
    if (data) {
        // Update weather details with data from the selected location
        document.getElementById("location-name").innerText = location;
        document.getElementById("location-condition").innerText = `Condition: ${data.condition}`;
        document.getElementById("location-temp").innerText = `Temperature: ${data.temp}`;
        document.getElementById("location-humidity").innerText = `Humidity: ${data.humidity}`;
        document.getElementById("location-wind").innerText = `Wind: ${data.wind}`;
    } else {
        // If location data is not found, display an error message
        displayError("Location not found");
    }
}

// Function to display an error message in the weather details section
function displayError(message) {
    document.getElementById("location-name").innerText = message;
    document.getElementById("location-condition").innerText = "";
    document.getElementById("location-temp").innerText = "";
    document.getElementById("location-humidity").innerText = "";
    document.getElementById("location-wind").innerText = "";
}

// Optional: Add an event listener to catch clicks on undefined areas
document.addEventListener("click", (event) => {
    if (event.target.tagName === "AREA") {
        const location = event.target.alt; // Get location name from 'alt' attribute
        showWeather(location); // Display weather for the clicked location
    }
});
