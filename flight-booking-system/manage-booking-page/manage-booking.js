

document.getElementById('booking-lookup-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const confirmation = document.getElementById('confirmation-number').value().trim();
    const email = document.getElementById('email').value().trim();

    if(!confirmation || !email) {
        alert("need confirmation number and email to search")
        return;
    }


    //POST to backend
    const response = await fetch('/api/bookings/searchBookedFlight' {
        method: 'POST',
        header: {'content-type' : 'aplication/json' },
        body: JSON.stringify({ confirmation, email})
    });

    const booking = await response.json();

    document.getElementById('booking-display').style.display = 'block';

    // Add button listeners after the section becomes visible
    document.getElementById('reschedule-booking').addEventListener('click', function() {
        document.getElementById('reschedule-section').style.display = 'block';
    });

    document.getElementById('cancel-booking').addEventListener('click', function() {
        document.getElementById('booking-display').style.display = 'none';
        document.getElementById('reschedule-section').style.display = 'none';
    });
});

