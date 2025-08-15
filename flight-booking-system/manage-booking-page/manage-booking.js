document.getElementById('booking-lookup-form').addEventListener('submit', function(e) {
    e.preventDefault();
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