
// helper functions for data extraction
const FormDataExtractor = {
    // Extract customer data from form
    getCustomerDataFromForm() {
        return {
            first_name: document.getElementById("first_name").value,
            last_name: document.getElementById("last_name").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
            zip: document.getElementById("zip").value,
            country: document.getElementById("country").value,
            phone: document.getElementById("phone").value
        };
    },

    // get flight data from URL and localStorage
    getFlightData() {
        const urlParams = new URLSearchParams(window.location.search);
        const flightId = urlParams.get('flightId') || 'FL1001';
        const price = urlParams.get('price') || '299';
        const selectedSeats = urlParams.get('selectedSeats') || '';

        // get the flight details from localStorage
        const flightData = JSON.parse(localStorage.getItem('flightResults') || '[]');
        const selectedFlight = flightData.find(f => f.flight_id === flightId);

        if (!selectedFlight) {
            alert('Flight information not found. Please go back and select a flight again.');
            return false;
        }

        return {
            flight: {
                flight_id: flightId,
                departure_airport: selectedFlight.departure_airport,
                arrival_airport: selectedFlight.arrival_airport,
                departure_date: selectedFlight.departure_date,
                departure_time: selectedFlight.departure_time,
                price: price
            },
            selectedSeats: selectedSeats
        };
    }
};

//form submission handler
const addNewCustomer = async (event) => {
    event.preventDefault();

    // extract necessary data
    const customerData = FormDataExtractor.getCustomerDataFromForm();
    const { flight, selectedSeats } = FormDataExtractor.getFlightData();

    // create booking with the booking class
    const newBooking = window.bookingManager.createBooking(
        flight,
        selectedSeats,
        customerData
    );

    // prepare confirmation page parameters
    const confirmationParams = new URLSearchParams({
        confirmation: newBooking.confirmation,
        flightId: flight.flight_id,
        price: flight.price,
        selectedSeats: selectedSeats,
        firstName: customerData.first_name,
        lastName: customerData.last_name,
        email: customerData.email
    });

    // redirect to confirmation page
    window.location.href = `../confirmation-page/confirmation.html?${confirmationParams.toString()}`;

    return false;
};

// order summary display function
function displayOrderSummary() {
    const { flight, selectedSeats } = FormDataExtractor.getFlightData();
    const pricingDiv = document.getElementById('pricing');

    if (!pricingDiv) return;

    let summaryHTML = `<h3>Flight: ${flight.flight_id}</h3>`;

    // display selected seats available
    if (selectedSeats) {
        const seatsArray = selectedSeats.split(',');
        summaryHTML += `
            <div class="seat-info">
                <h4>Selected Seats:</h4>
                <div class="seat-list">${seatsArray.join(', ')}</div>
                <small>${seatsArray.length} seat${seatsArray.length > 1 ? 's' : ''} selected</small>
            </div>
        `;
    }

    summaryHTML += `
        <h3>Subtotal: $${flight.price}</h3>
        <h3>Total: $${flight.price}</h3>                   
    `;

    pricingDiv.innerHTML = summaryHTML;
}

// initialize when page loads
document.addEventListener('DOMContentLoaded', displayOrderSummary);