/**
 * checkout-page.js
 * 
 * path: flight-booking-system/checkout-page/checkout-page.js
 * what it do: 
 * 
 */


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
        
        //get the flight and seat the user chose on our result page
        // and pass these objects to our checkout page
        let flightFromStorage = localStorage.getItem("selectedFlight");
            // if there are data, turn JSON string to object  "name":"timmy"-> name: "timmy"
            if(flightFromStorage){
                flightFromStorage = JSON.parse(flightFromStorage);
            } else {
                flightFromStorage = null; //set to null if no data. 
            }

        let seatFromStorage = localStorage.getItem("selectedSeat"); // same with seat, check from local storage
            if(!seatFromStorage) {
                seatFromStorage = ""; // no seat, set to empty string  "    "
            }
        
        // if find flight in local storage. 
        if(flightFromStorage) { 
            return {
                flight: flightFromStorage, // return full flight detail 
                selectedSeat: seatFromStorage // return seat number ect '6A'
            };
        }


        const urlParams = new URLSearchParams(window.location.search);
        const flight_id = urlParams.get('flight_id') || 'FL1001';
        const price = Number(urlParams.get('price')) || 299;
        const selectedSeat = urlParams.get('selectedSeat') || '';

        // get the flight details from localStorage
        const flightData = JSON.parse(localStorage.getItem('flightResults') || '[]');
        const selectedFlight = flightData.find(f => f.flight_id === flight_id);

        if (!selectedFlight) {
            alert('Flight information not found. Please go back and select a flight again.');
            return false;
        }

        return {
            flight: {
                flight_id: flight_id,
                departure_airport: selectedFlight.departure_airport,
                arrival_airport: selectedFlight.arrival_airport,
                departure_date: selectedFlight.departure_date,
                departure_time: selectedFlight.departure_time,
                price: price
            },
            selectedSeat: selectedSeat
        };
    }
};

//form submission handler
const addNewCustomer = async (event) => {
    event.preventDefault();
    
    // extract necessary data
    const customerData = FormDataExtractor.getCustomerDataFromForm();
    const { flight, selectedSeat } = FormDataExtractor.getFlightData();
    
    // seat part
    let seat = "";
    if(Array.isArray(selectedSeat)) { // if seat comes in an array ["6A", "1B"]
        seat = selectedSeat[0] || ""; // get the first seat only
    } else {
        seat = selectedSeat || "";
    }
    seat = seat.trim(); // we want seat to be string - ex: "2A"

    if(!seat) {
        alert ("Please select a seat before continue");
        return false;
    }

    const newBookingData = {
        flight,
        selectedSeat: seat,
        customer: customerData
    };

    //
    const serverResponse = await fetch("/api/bookings",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body:JSON.stringify(newBookingData)
    });

    if (!serverResponse.ok) {
        alert("Booking failed........");
        return false;
    }
    const savedBooking = await serverResponse.json();

    // // create booking with the booking class
    // const savedBooking = window.bookingManager.createBooking(
    //     flight,
    //     seat,
    //     customerData
    // );

    // prepare confirmation page parameters
    const confirmationParams = new URLSearchParams({
        confirmation: savedBooking.confirmation,
        flight_Id: flight.flight_id,
        price: flight.price,
        seat: seat,
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
    const { flight, selectedSeat } = FormDataExtractor.getFlightData();
    const pricingDiv = document.getElementById('pricing');

    if (!pricingDiv) return;

    let summaryHTML = `<h3>Flight: ${flight.flight_id}</h3>`;

    // display selected seats available
    if (selectedSeat) {
        const seatsArray = selectedSeat.split(',');
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

document.addEventListener('DOMContentLoaded', () => {
    displayOrderSummary();

    const form = document.getElementById('checkout-form') || document.querySelector('form');
    if(!form) {
        console.warn('[checkout] uh oh no form. skip submit handler');
        return;
    }
    form.addEventListener('submit', addNewCustomer);
});