/**
 * flight-search-results.js
 * Flight Search Results Page
 *
 * This will displays the results of the flight search
 * and managing seat map
 */

import { createSeatMap } from "./seat-selection.js";


const resultsContainerEl = document.getElementById('flight-results-container');

const flightResultsData = JSON.parse(localStorage.getItem('flightResults') || '[]' );


if (!resultsContainerEl) throw new Error("no flight results container.");

if (flightResultsData.length === 0) {
    resultsContainerEl.textContent = "sorry, we cannot find any flights with the inputs.";
}

// //forEach call a function for each element in an array
// flightResultsData.forEach(flight => {

//     const flightCardEl = document.createElement('div');
    
//     flightCardEl.textContent = `${flight.departure_airport} -> ${flight.arrival_airport}`;
//     resultsContainerEl.appendChild(flightCardEl);
// });

async function displayFlights() {

    let html = `<h2>Available Flights</h2>`;

    for (const flight of flightResultsData) {
        html += `
            <div class="flight-info">
                <h3>${flight.airline} - ${flight.flight_id}</h3>

                <p> ${flight.departure_airport} → ${flight.arrival_airport}</p>
                <p>Departure Date: ${flight.departure_date}</p>
                <p>Departure Time: ${flight.departure_time}</p>
                <p>Price: $${flight.price}</p>

                <button id="seatBtn-${flight.flight_id}" onclick="showSeats('${flight.flight_id}')">
                    Select Seats
                </button>

                ${await createSeatMap(flight.flight_id)}

                <button id="continueBtn" onclick="goToCheckout()" disabled>
                    Continue to Checkout
                </button>

            </div>
        `;
    }

    resultsContainerEl.innerHTML = html;
}

displayFlights();