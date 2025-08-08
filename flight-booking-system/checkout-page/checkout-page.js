// checkout-page.js handles customer data and order processing

// customer class to store passenger info
class Customer {
    constructor(fname,lname,email,address,city,state,zip,country,phone) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
        this.phone = phone;
        // generate confirmation number when customer is created
        this.confirmationNumber = this.generateConfirmationNumber();
    }

    // generate confirmation number based on current date/time
    generateConfirmationNumber() {
        const now = new Date();

        // create date string in yymmdd format
        const dateStr = now.getFullYear().toString().slice(-2) +
            String(now.getMonth() + 1).padStart(2, '0') +
            String(now.getDate()).padStart(2, '0');

        // create time string with hours, minutes, and random number
        const timeStr = String(now.getHours()).padStart(2, '0') +
            String(now.getMinutes()).padStart(2, '0') +
            String(Math.floor(Math.random() * 100)).padStart(2, '0');

        // combine with "fl" prefix
        return `FL${dateStr}${timeStr}`;
    }
}

// array to store all customer objects
let customerArray = [];

// function to handle form submission and create new customer
const addNewCustomer = (event) => {
    // prevent form from doing default submit action
    event.preventDefault();

    // get all form values from input fields
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;
    const country = document.getElementById("country").value;
    const phone = document.getElementById("phone").value;

    // create new customer object with form data
    const newCustomer = new Customer(firstName, lastName, email, address, city, state, zip, country, phone);

    // add customer to our array
    customerArray.push(newCustomer);

    // make customer array available globally (for debugging/other scripts)
    window.customerArray = customerArray;

    // get flight info from url parameters (passed from previous page)
    const urlParams = new URLSearchParams(window.location.search);

    // create parameters to pass to confirmation page
    const confirmationParams = new URLSearchParams({
        confirmation: newCustomer.confirmationNumber,
        flightId: urlParams.get('flightId') || 'FL1001',
        price: urlParams.get('price') || '299',
        selectedSeats: urlParams.get('selectedSeats') || '',
        firstName: firstName,
        lastName: lastName,
        email: email
    });

    // redirect to confirmation page with all booking details
    window.location.href = `../confirmation-page/confirmation.html?${confirmationParams.toString()}`;

    // return false to prevent any default form submission
    return false;
};

// function to display order summary on checkout page
function displayOrderSummary() {
    // get flight details from url parameters
    const urlParams = new URLSearchParams(window.location.search);
    const flightId = urlParams.get('flightId') || 'FL1001';
    const price = urlParams.get('price') || '299';
    const selectedSeats = urlParams.get('selectedSeats') || '';

    // find the pricing display area
    const pricingDiv = document.getElementById('pricing');
    if (pricingDiv) {
        // start building the summary html
        let summaryHTML = `<h3>Flight: ${flightId}</h3>`;

        // display selected seats if available
        if (selectedSeats) {
            // split seats string into array
            const seatsArray = selectedSeats.split(',');
            summaryHTML += `
                <div class="seat-info">
                    <h4>Selected Seats:</h4>
                    <div class="seat-list">${seatsArray.join(', ')}</div>
                    <small>${seatsArray.length} seat${seatsArray.length > 1 ? 's' : ''} selected</small>
                </div>
            `;
        }

        // add total price to summary
        summaryHTML += `<h3>Total: $${price}</h3>`;

        // put the summary html into the pricing div
        pricingDiv.innerHTML = summaryHTML;
    }
}

// run order summary display when page loads
document.addEventListener('DOMContentLoaded', displayOrderSummary);