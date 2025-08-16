

document.getElementById('booking-lookup-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const confirmation = document.getElementById('confirmation-number').value.trim();
    const email = document.getElementById('email').value.trim();

    if(!confirmation || !email) {
        alert("need confirmation number and email to search")
        return;
    }

    //POST to backend
    const response = await fetch('/api/bookings/lookup', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json' },
        body: JSON.stringify({ confirmation, email})
    });


    const booking = await response.json();

    // data check. devtool displaying a booking list with correct cfm code and email 
    console.log(booking); 

    // if no booking found. display a message to let customer know. 
    if (!booking || booking.error) {
        alert ("we cant find any flights from your search. \n please check whether the confirmation number and email is correct and try again")
        document.getElementById('booking-display').style.display = 'none'; //dont display anything
        return;
    }


/*==============================================================================================*/
    //results from backend 
    document.getElementById('booking-display').style.display = 'block'; // display the result

    const flightID = booking.flightId || 'not available';
    const from = booking.departure_airport || 'not available';
    const to = booking.arrival_airport || 'not available';
    const status = (booking.status || 'not available').toString().toUpperCase();
    const seat = booking.selectedSeat || 'not available';

    let departureDateTime = (booking.departure_date || 'not available') + " At " + (booking.departure_time || '');
    let arrivalDateTime = 'not available'

    //passenger first and last name
    // display customer full name if we have it in booking.customer
    let passenger = "not available";
    if (booking.customer) {
        passenger = booking.customer.first_name + " " + booking.customer.last_name;
    }
/*===================================================================================================*/
    const flightDisplay = document.getElementById('flight-display');
    if (flightDisplay) flightDisplay.textContent = flightID;

    const fromDisplay = document.getElementById('from-display');
    if (fromDisplay) fromDisplay.textContent = from;

    const toDisplay = document.getElementById('to-display');
    if (toDisplay) toDisplay.textContent = to;

    const seatDisplay = document.getElementById('seat-display');
    if (seatDisplay) seatDisplay.textContent = seat;

    const passengerDisplay = document.getElementById('passenger-display');
    if(passengerDisplay) passengerDisplay.textContent = passenger

    //for departure date and time
    const departureDisplay = document.getElementById('departure-display');
    if (departureDisplay) departureDisplay.textContent = departureDateTime;

    const arrivalDisplay = document.getElementById('arrival-display');
    if (arrivalDisplay) arrivalDisplay.textContent = arrivalDateTime;

    const statusDisplay = document.getElementById('status-display');
    if (statusDisplay) statusDisplay.textContent = status;

    // hide cancel button if status is already canceled
    const cancelButton = document.getElementById('cancel-booking');
    if (status === "CANCELED" && cancelButton) {
        cancelButton.style.display = "none";
    } else if (cancelButton) {
        cancelButton.style.display = "inline-block";
    }


/*=====================================================================*/

    // Add button listeners after the section becomes visible
    document.getElementById('reschedule-booking').addEventListener('click', function() {
        document.getElementById('reschedule-section').style.display = 'block';
    });

    //cancel booking <button>
    document.getElementById('cancel-booking').addEventListener('click', async function() {

        //display message to ask user if he wants to cancel. 
        const cancelCheck = window.confirm("You're cancelling the flight. are you certain?");
        if (!cancelCheck) return;


        const confirmationCancel = document.getElementById('confirmation-number').value.trim();
        const emailCancel = document.getElementById('email').value.trim();

        const response = await fetch('/api/bookings/cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ confirmation, email })
        });

        const result = await response.json();

        if (result && result.status === "CANCELED") {
            alert("booking successfuly canceled");
            document.getElementById('booking-display').style.display = 'none'; // hide display 
            document.getElementById('reschedule-section').style.display = 'none';// none - hide display
        } else {
            alert("error, something went wrong. cannot cancel");
        }

    });
});




