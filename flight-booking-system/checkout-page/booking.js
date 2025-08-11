/**
 * booking.js - Centralized booking management
 *
 * Single source of truth for booking operations, customer data, and confirmation generation
 */

class Booking {
    constructor({ flight, seat, customer }) {
        // Flight details
        this.flightId = flight.flight_id;
        this.departure_airport = flight.departure_airport;
        this.arrival_airport = flight.arrival_airport;
        this.departure_date = flight.departure_date;
        this.departure_time = flight.departure_time;
        this.price = flight.price;

        // Seat selection
        this.seat = seat;

        // Customer information (standardized structure)
        this.customer = this.standardizeCustomerData(customer);

        // Generate confirmation number
        this.confirmation = this.generateConfirmation();

        // Timestamp
        this.timestamp = new Date().toISOString();
    }

    // Standardize customer data structure
    standardizeCustomerData(customer) {
        return {
            first_name: customer.first_name || customer.fname,
            last_name: customer.last_name || customer.lname,
            email: customer.email,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            zipcode: customer.zip || customer.zipcode,
            country: customer.country,
            phone: customer.phone
        };
    }

    // Single confirmation generation method
    generateConfirmation() {
        const date = this.departure_date || "";
        const airport = this.departure_airport || "";
        const flightId = this.flightId || "";

        // Remove colon from time (as noted in TODO)
        const time = (this.departure_time || "").replace(":", "");

        const confirmationCode = `CFN${date}${airport}${flightId}${time}`;
        console.log("Generated confirmation:", confirmationCode);

        return confirmationCode;
    }

    // Get booking summary for display
    getBookingSummary() {
        return {
            confirmation: this.confirmation,
            flight: {
                id: this.flightId,
                route: `${this.departure_airport} → ${this.arrival_airport}`,
                date: this.departure_date,
                time: this.departure_time,
                price: this.price
            },
            customer: {
                name: `${this.customer.first_name} ${this.customer.last_name}`,
                email: this.customer.email
            },
            seat: this.seat,
            timestamp: this.timestamp
        };
    }

    // Convert to JSON for storage
    toJSON() {
        return {
            confirmation: this.confirmation,
            flightId: this.flightId,
            departure_airport: this.departure_airport,
            arrival_airport: this.arrival_airport,
            departure_date: this.departure_date,
            departure_time: this.departure_time,
            price: this.price,
            seat: this.seat,
            customer: this.customer,
            timestamp: this.timestamp
        };
    }
}

// Utility class for managing multiple bookings
class BookingManager {
    constructor() {
        this.bookings = [];
    }

    // Create new booking
    createBooking(flightData, seatData, customerData) {
        const booking = new Booking({
            flight: flightData,
            seat: seatData,
            customer: customerData
        });

        this.bookings.push(booking);
        console.log("New booking created:", booking.getBookingSummary());

        return booking;
    }

    // Find booking by confirmation
    findBooking(confirmationNumber) {
        return this.bookings.find(booking =>
            booking.confirmation === confirmationNumber
        );
    }

    // Get all bookings as JSON
    getAllBookingsJSON() {
        return this.bookings.map(booking => booking.toJSON());
    }
}

// Create global booking manager instance
window.bookingManager = new BookingManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Booking, BookingManager };
}