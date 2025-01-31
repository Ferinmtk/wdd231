
//fetching current date and time
document.addEventListener('DOMContentLoaded', () => {
    const membersContainer = document.getElementById('members');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('last-modified');

    // Display current year and last modified date
    yearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = new Date(document.lastModified).toLocaleString();

    // Variable to store member data
    let members = [];

    // Fetch and display members
    const fetchMembers = async () => {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            members = await response.json();
            displayMembers(members, 'grid'); // Display in grid view by default
        } catch (error) {
            console.error("Error fetching members:", error);
            membersContainer.innerHTML = `<p class="error-message">Unable to load member data. Please try again later.</p>`;
        }
    };

    // Function to display members in the specified view
    const displayMembers = (members, view) => {
        membersContainer.className = view; // Apply view class
        membersContainer.innerHTML = ''; // Clear existing content

        if (!members.length) {
            membersContainer.innerHTML = `<p class="error-message">No members to display.</p>`;
            return;
        }

        members.forEach(member => {
            const card = document.createElement('div');
            card.className = 'member-card';
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}" loading="lazy">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
            `;
            membersContainer.appendChild(card);
        });
    };

    // Add event listeners to toggle views
    gridViewButton.addEventListener('click', () => {
        gridViewButton.classList.add('active');
        listViewButton.classList.remove('active');
        displayMembers(members, 'grid');
    });

    listViewButton.addEventListener('click', () => {
        listViewButton.classList.add('active');
        gridViewButton.classList.remove('active');
        displayMembers(members, 'list');
    });

    // Initial fetch
    fetchMembers();
});

document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'e2569e6bc2a3c335fd02a5aeb9c4e23b';
    const LAT = 49.750575158619476; // Trier's latitude
    const LON = 6.636411660826279; // Trier's longitude

    const currentTempElement = document.getElementById('current-temp');
    const weatherDescElement = document.getElementById('weather-desc');
    const day1Element = document.getElementById('day1');
    const day2Element = document.getElementById('day2');
    const day3Element = document.getElementById('day3');

    const getWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const weatherData = await response.json();
            const currentWeather = weatherData.list[0]; // Current weather info

            // Display current temperature and description
            currentTempElement.textContent = `${Math.round(currentWeather.main.temp)}°C`;
            weatherDescElement.textContent = capitalizeWords(currentWeather.weather[0].description);

            // Display the next three days' forecast
            day1Element.textContent = formatForecast(weatherData.list[8]); // 24 hours later
            day2Element.textContent = formatForecast(weatherData.list[16]); // 48 hours later
            day3Element.textContent = formatForecast(weatherData.list[24]); // 72 hours later
        } catch (error) {
            console.error('Error fetching weather data:', error);
            currentTempElement.textContent = 'Error';
            weatherDescElement.textContent = 'Error';
            day1Element.textContent = 'Error';
            day2Element.textContent = 'Error';
            day3Element.textContent = 'Error';
        }
    };

    // Helper function to capitalize weather description
    const capitalizeWords = (str) => {
        return str
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Helper function to format the forecast data
    const formatForecast = (forecast) => {
        const temp = Math.round(forecast.main.temp);
        const description = capitalizeWords(forecast.weather[0].description);
        return `${temp}°C, ${description}`;
    };

    // Fetch weather data
    getWeatherData();
});


  // Fetch data from the external JSON file
fetch('data/members.json')
.then(response => response.json()) // Parse the JSON
.then(members => {
    // Filter for gold or silver members
    const goldSilverMembers = members.filter(member => member.membership === "gold" || member.membership === "silver");

    // Randomly select 2 or 3 members
    const randomMembers = goldSilverMembers.sort(() => Math.random() - Math.random()).slice(0, 3);

    // Generate spotlight cards
    generateSpotlights(randomMembers);
})
.catch(error => {
    console.error('Error loading member data:', error);
});




// Function to generate spotlight cards
function generateSpotlights(members) {
const container = document.getElementById('spotlights-container');
members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('spotlight-card');

    card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Membership Level:</strong> ${member.membership}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    container.appendChild(card);
});
}





//JOIN.HTML CODE


// Retrieve URL parameters and display them

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("join-form");
    
    if (form) {
        form.addEventListener("submit", () => {
            // Set the timestamp field to the current date/time
            document.getElementById("timestamp").value = new Date().toISOString();
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById('display-first-name').textContent = urlParams.get('first-name') || "Not provided";
    document.getElementById('display-last-name').textContent = urlParams.get('last-name') || "Not provided";
    document.getElementById('display-email').textContent = urlParams.get('email') || "Not provided";
    document.getElementById('display-phone').textContent = urlParams.get('phone') || "Not provided";
    document.getElementById('display-business-name').textContent = urlParams.get('business-name') || "Not provided";

    // Retrieve and format the timestamp
    const timestamp = urlParams.get('timestamp');
    if (timestamp) {
        const date = new Date(timestamp);
        document.getElementById('display-timestamp').textContent = isNaN(date.getTime()) ? "Invalid date" : date.toLocaleString();
    } else {
        document.getElementById('display-timestamp').textContent = "No timestamp provided";
    }
});
