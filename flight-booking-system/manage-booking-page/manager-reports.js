/**
 * 
 * manager-reports.js
 * 
 *    - get bookings report
 *    - display the flights, 
 *    - display amount of [total bokings] and [revenue] 
 *    - make a booking table using <td>Cell A</td> ref: https://www.w3schools.com/tags/tag_td.asp
 * 
 *  url: http://localhost:3000/static/manage-booking-page/manager-reports.html to access.
 * 
 */


async function loadManagerReport() {

    const res = await fetch("/api/manager/reports");
    const data = await res.json();

    console.log("Manager Report:", data);
    return data;
}

function displayTotal(report) {

    const totalBookingDisplay = document.getElementById("total-bookings");
    const totalRevenueDisplay = document.getElementById("total-revenue");

    totalBookingDisplay.textContent = report.totalBookings;
    totalRevenueDisplay.textContent = "$" + report.totalRevenue;
}

function displayBookings (bookings) {
    const tableBody = document.getElementById("bookings-table-body");

    tableBody.innerHTML = ""; // clear table

    for ( let i = 0; i < bookings.length; i++){
        const booking = bookings[i];
        const row = document.createElement("tr");

    let statusClass = "booking-status";
    if (booking.status === "CONFIRMED") {
        statusClass += " status-confirmed"; //this will make statusClass.status-confirmed
    }else if (booking.status === "CANCELED") {
        statusClass += " status-canceled";
    }

        row.innerHTML = `
            <td class = "confirmation-code">${booking.confirmation}</td>
            <td class="passenger-name">${booking.customer ? booking.customer.first_name + " " + booking.customer.last_name : ""}</td>
            <td class="flight-id">${booking.flightId}</td>
            <td class="route-info">${booking.departure_airport} -> ${booking.arrival_airport }</td>
            <td class="datetime-info">${booking.departure_date} ${booking.departure_time}</td>
            <td class="seat-display">${booking.selectedSeat}</td>
            <td class="price-info">$${booking.price}</td>
            <td class="${statusClass}">${booking.status}</td>




        `;
        tableBody.appendChild(row);
    }

}

// load everything when clicking managerpage
window.addEventListener("DOMContentLoaded", async () => {
    const report = await loadManagerReport();
    displayTotal(report);
    displayBookings(report.bookings);
});


