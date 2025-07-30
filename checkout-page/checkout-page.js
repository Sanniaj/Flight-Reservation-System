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
    }
}

let customerArray = [];

const addNewCustomer = (event) => {
    event.preventDefault(); // Prevent form from submitting normally

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
    customerArray.push(newCustomer); // Add to array
    console.log(newCustomer);
    console.log("Total customers:", customerArray.length);

    event.target.reset();

    return false;
};