
import { createSeatMap } from "./seat-selection.js";

const resultsContainerEl = document.getElementById('flight-results-container');
const titleEl = document.getElementById('title');

const flightResultsData = JSON.parse(localStorage.getItem('flightResults') || '[]');

if (!resultsContainerEl) throw new Error("no flight results container.");

//no flights found handling
if (flightResultsData.length === 0) {
    displayNoFlightsFound();
} else {
    displayFlights();
}

function displayNoFlightsFound() {
    //page title
    titleEl.textContent = "No Flights Found";

    //no results message with search again option
    resultsContainerEl.innerHTML = `
        <div class="empty-results">
            <div style="text-align: center; padding: 40px 20px;">
                <h2 style="color: var(--g6-deep-blue); margin-bottom: 15px; font-size: 1.8rem;">
                    No Flights Found
                </h2>
                <p style="color: var(--g6-text-secondary); margin-bottom: 30px; font-size: 1.1rem; line-height: 1.6;">
                    We couldn't find any flights that match your search criteria.<br>
                   Try adjusting your search parameters, or select a different date.
                </p>
                
                <div style="background: var(--g6-light-gray); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid var(--g6-sky-blue);">
                    <h4 style="color: var(--g6-deep-blue); margin-bottom: 10px;">Search Tips:</h4>
                    <ul style="text-align: left; color: var(--g6-text-secondary); max-width: 400px; margin: 0 auto;">
                        <li>Try different departure or arrival airports</li>
                        <li>Check if your airport codes are correct (e.g., LAX, JFK)</li>
                    </ul>
                </div>
                
                <button onclick="goBackToSearch()" style="
                    background: linear-gradient(135deg, var(--g6-deep-blue) 0%, var(--g6-sky-blue) 100%);
                    color: white;
                    padding: 15px 30px;
                    border: none;
                    border-radius: 8px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    transition: all 0.3s ease;
                    margin: 10px;
                ">
                    Search Again
                </button>
            </div>
        </div>
    `;
}

async function displayFlights() {
    //page title for successful results
    titleEl.textContent = "Flight Search Results";

    let html = `<h2>Available Flights</h2>`;

    for (const flight of flightResultsData) {
        html += `
            <div class="flight-info">
                <div class="flight-header">
                    <h3>${flight.airline} - ${flight.flight_id}</h3>
                </div>
                
                <div class="flight-details">
                    <div class="route-section">
                        <div class="airport">
                            <div class="airport-code">${flight.departure_airport}</div>
                        </div>
                        <div class="route-arrow">→</div>
                        <div class="airport">
                            <div class="airport-code">${flight.arrival_airport}</div>
                        </div>
                    </div>
                    
                    <div class="flight-meta">
                        <div class="meta-item">
                            <div class="meta-label">Date</div>
                            <div class="meta-value">${flight.departure_date}</div>
                        </div>
                        <div class="meta-item">
                            <div class="meta-label">Time</div>
                            <div class="meta-value">${flight.departure_time}</div>
                        </div>
                    </div>
                    
                    <div class="price-section">
                        <div class="price-label">Price</div>
                        <div class="price-value">$${flight.price}</div>
                    </div>
                </div>

                <div class="flight-actions">
                    <button id="seatBtn-${flight.flight_id}" onclick="showSeats('${flight.flight_id}')">
                        Select Seats
                    </button>

                    ${await createSeatMap(flight.flight_id)}

                    <button id="continueBtn-${flight.flight_id}" onclick="goToCheckout('${flight.flight_id}')" disabled>
                        Continue to Checkout
                    </button>
                </div>
            </div>
        `;
    }

    resultsContainerEl.innerHTML = html;
}

//function for navigation
window.goBackToSearch = function() {
    // clear the stored results to start fresh
    localStorage.removeItem('flightResults');

    // go back to the homepage
    window.location.href = '/static/search-page/frontend-search-location.html';
};