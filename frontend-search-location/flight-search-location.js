import {locationSearch} from "./locationSearch.js";

let departureLocation, arrivalLocation;

const airlines = ["American Airlines", "Delta", "United", "Southwest", "JetBlue", "Alaska Airlines", "Spirit", "Frontier Airlines"];
const aircraftTypes = ["Boeing 737", "Boeing 777", "Airbus A320", "Airbus A330", "Boeing 747"];

// Generate enhanced flight data from CSV data
const enhanceFlightData = (csvFlight) => {
    return {
        ...csvFlight,
        id: `FL${Math.floor(Math.random() * 9000) + 1000}`,
        airline: airlines[Math.floor(Math.random() * airlines.length)],
        aircraft: aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)],
        duration: `${Math.floor(Math.random() * 6) + 1}h ${Math.floor(Math.random() * 60)}m`,
        stops: Math.random() < 0.7 ? "Direct" : "1 Stop"
    };
};

const flightSearchResults = () => {
    departureLocation = document.getElementById("departure").value;
    arrivalLocation = document.getElementById("arrival").value;
    const departureDate = document.getElementById("departureDate").value;

    if(!departureLocation || !arrivalLocation || !departureDate){
        alert("please fill out all search criteria");
        return;
    }

    console.log("Searching departure location:");
    locationSearch(departureLocation);
    console.log("Searching arrival location:");
    locationSearch(arrivalLocation);

    // Fetch and filter CSV data
    fetch("flight-data.csv")
        .then(response => response.text())
        .then(data => {
            let filterData = [];
            const rows = data.split('\n');

            for (let i = 1; i < rows.length; i++){
                const row = rows[i].trim(); // ADDED .trim() to remove \r and whitespace
                if (!row) continue; // Skip empty rows

                const columns = row.split(',');

                const csvDeparture = columns[0].trim(); // ADDED .trim()
                const csvArrival = columns[1].trim();   // ADDED .trim()
                const csvDepartureDate = columns[2].trim(); // ADDED .trim()
                const csvDepartureTime = columns[3].trim(); // ADDED .trim()

                console.log(`Checking: ${csvDeparture} -> ${csvArrival} on ${csvDepartureDate}`);
                console.log(`Against: ${departureLocation} -> ${arrivalLocation} on ${departureDate}`);

                if(csvDeparture !== departureLocation) continue;
                if(csvArrival !== arrivalLocation) continue;
                if(csvDepartureDate !== departureDate) continue;

                console.log("Match found!");
                filterData.push({
                    departure: csvDeparture,
                    arrival: csvArrival,
                    departureDate: csvDepartureDate,
                    departureTime: csvDepartureTime
                });
            }

            console.log(`Found ${filterData.length} flights`);

            // Enhance CSV data with additional flight information
            const enhancedFlights = filterData.map(flight => enhanceFlightData(flight));

            saveFlightSearchResults(enhancedFlights);
            window.location.href = "flight-search-results.html";
        })
        .catch(error => {
            console.error('Error fetching flight data:', error);
            alert('Error loading flight data. Please try again.');
        });
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

    if (flights.length === 0) {
        searchFlightsDiv.innerHTML = '<h2>No flights found</h2>';
        return;
    }

    let flightsHTML = `<h2>Flights from ${dep} to ${arr}</h2>`;

    flights.forEach(flight => {
        flightsHTML += `
            <div class="flight-info">
                <h3>${flight.airline} - ${flight.id}</h3>
                <p>Departure Time: ${flight.departureTime}</p>
                <p>Duration: ${flight.duration}</p>
                <p>Aircraft: ${flight.aircraft}</p>
                <p>Stops: ${flight.stops}</p>
                <button class="selectFlightButton" onclick="selectFlight()">Select Flight</button>
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