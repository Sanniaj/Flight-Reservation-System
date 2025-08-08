// confirmation.js - handles displaying booking confirmation details

function displayConfirmation() {
    // get all the booking info from the url parameters
    const urlParams = new URLSearchParams(window.location.search);

    // extract confirmation details with fallback values
    const confirmationNumber = urlParams.get('confirmation') || 'FL240806001';
    const flightId = urlParams.get('flightId') || 'FL1001';
    const price = urlParams.get('price') || '299';
    const selectedSeats = urlParams.get('selectedSeats') || '';

    // get customer data from url parameters
    const firstName = urlParams.get('firstName') || '';
    const lastName = urlParams.get('lastName') || '';
    const email = urlParams.get('email') || '';

    // fill in the confirmation number field
    document.getElementById('confirmation_number').value = confirmationNumber;

    // combine first and last name for passenger name field
    document.getElementById('passenger_name').value = `${firstName} ${lastName}`;

    // fill in the email field
    document.getElementById('passenger_email').value = email;

    // display flight info with seats if available
    let flightInfo = flightId;
    if (selectedSeats) {
        // if seats were selected, add them to flight info
        const seatsArray = selectedSeats.split(',');
        flightInfo += ` | Seats: ${seatsArray.join(', ')}`;
    }

    // fill in flight information field
    document.getElementById('flight_info').value = flightInfo;

    // fill in total paid amount with dollar sign
    document.getElementById('total_paid').value = `$${price}`;
}

// run the display function when page finishes loading
document.addEventListener('DOMContentLoaded', displayConfirmation);