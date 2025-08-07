function displayConfirmation() {
    // CSV TODO: Replace localStorage with customers.csv reading
    const customerArray = JSON.parse(localStorage.getItem('customerArray') || '[]');
    const latestCustomer = customerArray[customerArray.length - 1];

    // CSV TODO: Replace URL params with bookings.csv lookup by confirmation number
    const urlParams = new URLSearchParams(window.location.search);
    const confirmationNumber = urlParams.get('confirmation') || 'FL240806001';
    const flightId = urlParams.get('flightId') || 'FL1001';
    const departure = urlParams.get('departure') || 'LAX';
    const arrival = urlParams.get('arrival') || 'JFK';
    const price = urlParams.get('price') || '299';

    document.getElementById('confirmation_number').value = confirmationNumber;

    if (latestCustomer) {
        document.getElementById('passenger_name').value = `${latestCustomer.fname} ${latestCustomer.lname}`;
        document.getElementById('passenger_email').value = latestCustomer.email;
    }

    document.getElementById('flight_info').value = `${flightId}: ${departure} → ${arrival}`;
    document.getElementById('total_paid').value = `$${price}`;
}

document.addEventListener('DOMContentLoaded', displayConfirmation);