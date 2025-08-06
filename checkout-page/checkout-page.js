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
        this.confirmationNumber = this.generateConfirmationNumber();
    }

    generateConfirmationNumber() {
        const now = new Date();
        const dateStr = now.getFullYear().toString().slice(-2) +
            String(now.getMonth() + 1).padStart(2, '0') +
            String(now.getDate()).padStart(2, '0');
        const timeStr = String(now.getHours()).padStart(2, '0') +
            String(now.getMinutes()).padStart(2, '0') +
            String(Math.floor(Math.random() * 100)).padStart(2, '0');
        return `FL${dateStr}${timeStr}`;
    }
}

let customerArray = [];

const addNewCustomer = (event) => {
    event.preventDefault();

    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;
    const country = document.getElementById("country").value;
    const phone = document.getElementById("phone").value;

    const newCustomer = new Customer(firstName, lastName, email, address, city, state, zip, country, phone);
    customerArray.push(newCustomer);

    // store in localStorage
    // BACKEND TODO: Replace with API call - fetch('/api/customers', { method: 'POST', body: newCustomer })
    localStorage.setItem('customerArray', JSON.stringify(customerArray));

    console.log(newCustomer);
    console.log("Total customers:", customerArray.length);

    // redirect to confirmation page
    // BACKEND TODO: Replace URL params with database flight lookup - fetch('/api/flights/' + flightId)
    const urlParams = new URLSearchParams(window.location.search);
    const confirmationParams = new URLSearchParams({
        confirmation: newCustomer.confirmationNumber,
        flightId: urlParams.get('flightId') || 'FL1001',
        departure: urlParams.get('departure') || 'LAX',
        arrival: urlParams.get('arrival') || 'JFK',
        price: urlParams.get('price') || '299'
    });

    window.location.href = `confirmation.html?${confirmationParams.toString()}`;

    return false;
};