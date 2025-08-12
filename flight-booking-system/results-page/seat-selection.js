// Fixed seat-selection.js with improvements

// Store selected seats per flight ID to avoid conflicts
const selectedSeatsPerFlight = {};



// Generate random occupied seats
function generateRandomOccupiedSeats() {
    const occupiedSeats = new Set();
    const occupancyRate = Math.random() * 0.75; // 0-75% occupancy
    const targetOccupied = Math.floor(60 * occupancyRate);

    const rows = 10;
    const seatsPerRow = ['A', 'B', 'C', 'D', 'E', 'F'];

    while (occupiedSeats.size < targetOccupied) {
        const randomRow = Math.floor(Math.random() * rows) + 1;
        const randomSeat = seatsPerRow[Math.floor(Math.random() * seatsPerRow.length)];
        const seatLabel = `${randomRow}${randomSeat}`;
        occupiedSeats.add(seatLabel);
    }

    return Array.from(occupiedSeats);
}

// Improved fetchSeatMap with fallback
async function fetchSeatMap() {
    try {
        const response = await fetch("/api/seatgen");
        if (!response.ok) {
            throw new Error('API request failed');
        }
        const data = await response.json();
        return data.SeatMap;
    } catch (error) {
        console.warn('Failed to fetch seat map from API, using fallback:', error);
        return generateFallbackSeatMap();
    }
}

// Create seat map with flight-specific handling
export async function createSeatMap(flightID) {
    // Initialize selected seats for this flight if not exists
    if (!selectedSeatsPerFlight[flightID]) {
        selectedSeatsPerFlight[flightID] = [];
    }

    const seatMap = await fetchSeatMap();

    // Generate random occupied seats
    const occupiedSeats = generateRandomOccupiedSeats();

    let html = `
        <div class="seat-map-container" style="display:none;" id="seatMap-${flightID}">
            <h4>Select Your Seats</h4>
            <p>Blue = Available | Red = Occupied | Green = Selected</p>`;

    // Loop through each row to create seats
    seatMap.forEach(row => {
        html += '<div class="seat-row">';
        row.forEach((seat, j) => {
            // Check if this seat is randomly occupied
            const isOccupied = occupiedSeats.includes(seat.label);
            const isSelected = selectedSeatsPerFlight[flightID].includes(seat.label);

            let seatClass = 'available';
            if (isOccupied) seatClass = 'occupied';
            else if (isSelected) seatClass = 'selected';

            html += `<div class="seat ${seatClass}" onclick="selectSeat('${seat.label}', '${flightID}')">${seat.label}</div>`;

            // Add aisle space after seat C
            if (j === 2) html += '<div class="aisle"></div>';
        });
        html += '</div>';
    });

    // Add summary section
    html += `<p>Selected: <span id="selectedList-${flightID}">None</span></p></div>`;

    return html;
}

// Improved seat selection with flight-specific handling
window.selectSeat = function(seatLabel, flightID) {
    const seatElement = document.querySelector(`#seatMap-${flightID} [onclick="selectSeat('${seatLabel}', '${flightID}')"]`);

    if (!seatElement || seatElement.classList.contains('occupied')) {
        return;
    }

    // Get current selections for this flight
    let currentSelections = selectedSeatsPerFlight[flightID] || [];

    if (currentSelections.includes(seatLabel)) {
        // Deselect seat
        selectedSeatsPerFlight[flightID] = currentSelections.filter(s => s !== seatLabel);
        seatElement.className = 'seat available';
    } else {
        // Select seat
        selectedSeatsPerFlight[flightID].push(seatLabel);
        seatElement.className = 'seat selected';
    }

    updateSummary(flightID);
};

// Update summary for specific flight
function updateSummary(flightID) {
    const selectedSeats = selectedSeatsPerFlight[flightID] || [];
    const listEl = document.getElementById(`selectedList-${flightID}`);

    if (listEl) {
        listEl.textContent = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None';
    }

    // Enable/disable continue button
    const btn = document.getElementById('continueBtn');
    if (btn) {
        const hasSelections = Object.values(selectedSeatsPerFlight).some(seats => seats.length > 0);
        btn.disabled = !hasSelections;
    }
}

// Show/hide seats function (unchanged but improved)
window.showSeats = function(flightID) {
    const container = document.getElementById(`seatMap-${flightID}`);
    const button = document.getElementById(`seatBtn-${flightID}`);

    if (!container || !button) {
        console.error(`Elements not found for flight ${flightID}`);
        return;
    }

    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'block';
        button.textContent = 'Hide Seats';
        // Initialize summary when showing
        updateSummary(flightID);
    } else {
        container.style.display = 'none';
        button.textContent = 'Select Seats';
    }
};

// Improved checkout function
window.goToCheckout = function() {
    // get all selected seats across all flights
    let allSelectedSeats = [];
    let selectedFlightId = '';
    let selectedPrice = '';
    let selectedFlightObj = null;

    // find the first flight that has selected seats
    Object.keys(selectedSeatsPerFlight).forEach(flightID => {
        const seats = selectedSeatsPerFlight[flightID];
        if (seats.length > 0) {
            allSelectedSeats = seats;
            selectedFlightId = flightID;

            // get price from flight results data
            const flightData = JSON.parse(localStorage.getItem('flightResults') || '[]');
            const flight = flightData.find(f => f.flight_id === flightID);
            selectedPrice = flight ? flight.price : '299';
            selectedFlightObj = flight; //store flight object
        }
    });

    if (allSelectedSeats.length === 0) {
        alert('Please select at least one seat before continuing.');
        return;
    }


    if(selectedFlightObj) {
        localStorage.setItem("selectedFlight", JSON.stringify(selectedFlightObj));
    }
    localStorage.setItem("selectedSeat", allSelectedSeats[0]);

    // create url parameters with the selected seats
    const urlParams = new URLSearchParams({
        flightId: selectedFlightId,
        price: selectedPrice,
        selectedSeats: allSelectedSeats.join(',')
    });

    // navigate to checkout with proper parameters
    window.location.href = `../checkout-page/checkout-page.html?${urlParams.toString()}`;
};

console.log('[seat-selection] Fixed version loaded');