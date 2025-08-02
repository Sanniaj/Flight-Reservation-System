import {locationSearch} from "./locationSearch.js";

let departureLocation, arrivalLocation;

const airlines = ["American Airlines", "Delta", "United", "Southwest", "JetBlue", "Alaska Airlines", "Spirit", "Frontier Airlines"];
const aircraftTypes = ["Boeing 737", "Boeing 777", "Airbus A320", "Airbus A330", "Boeing 747"];

//random flight gen
const generateRandomFlights = (departure, arrival) => {

    const flightCount = Math.floor(Math.random() * 11);

    if (flightCount === 0) {
        return [];
    }

    const flights = [];

    for (let i = 0; i < flightCount; i++) {
        const flight = {
            id: `FL${Math.floor(Math.random() * 9000) + 1000}`,
            airline: airlines[Math.floor(Math.random() * airlines.length)],
            departure: departure,
            arrival: arrival,
            aircraft: aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)],
            duration: `${Math.floor(Math.random() * 6) + 1}h ${Math.floor(Math.random() * 60)}m`,
            stops: Math.random() < 0.7 ? "Direct" : "1 Stop"
        };
        flights.push(flight);
    }

    return flights;
};

const flightSearchResults = () => {
    departureLocation = document.getElementById("departure").value;
    arrivalLocation = document.getElementById("arrival").value;

    console.log("Searching departure location:");
    locationSearch(departureLocation);
    console.log("Searching arrival location:");
    locationSearch(arrivalLocation);

    // generate random flights
    const flights = generateRandomFlights(departureLocation, arrivalLocation);

    saveFlightSearchResults(flights);
    window.location.href = "flight-search-results.html";
}

const saveFlightSearchResults = (flights) => {
    localStorage.setItem("departureLocation", JSON.stringify(departureLocation));
    localStorage.setItem("arrivalLocation", JSON.stringify(arrivalLocation));
    localStorage.setItem("flightResults", JSON.stringify(flights));
}


const selectFlight = () => {
    console.log('This button does something!');
}

const displayFlightSearchResults = () => {
    const dep = JSON.parse(localStorage.getItem("departureLocation"));
    const arr = JSON.parse(localStorage.getItem("arrivalLocation"));
    const flights = JSON.parse(localStorage.getItem("flightResults")) || [];

    const searchFlightsDiv = document.getElementById("searchFlights");

        let flightsHTML = `<h2>Flights from ${dep} to ${arr}</h2>`;

        flights.forEach(flight => {
            flightsHTML += `
                <div class="flight-info">
                    <h3>${flight.airline} - ${flight.id}</h3>
                    <p>Duration: ${flight.duration}</p>
                    <p>Aircraft: ${flight.aircraft}</p>
                    <p>Stops: ${flight.stops}</p>
                    <button class = "selectFlightButton" onclick="selectFlight()">Select Flight</button>
                </div>
            `;
        });

        searchFlightsDiv.innerHTML = flightsHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    //for search page
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', flightSearchResults);
    }
    // for results
    const searchFlights = document.getElementById('searchFlights');
    if (searchFlights) {
        displayFlightSearchResults();
    }
});