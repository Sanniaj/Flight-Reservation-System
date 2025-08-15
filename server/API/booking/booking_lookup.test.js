import { findBooking } from "./booking_lookup.js";


const bookingsSample = [
    { confirmation: "F20017-SJC-20250822-1115", email: "timmy@gmail.com" },
    { confirmation: "F20018-LAX-20250823-1400", email: "a@gmail.com" }
]
// console.log(findBooking(bookingsSample, "F20017-SJC-20250822-1115", "timmy@gmail.com"));
// console.log(findBooking(bookingsSample, "f20017-sjc-20250822-1115", "TIMY@GMAIL.COM"));
console.log(findBooking(bookingsSample, "  F20017-SJC-20250822-1115  ", "  Timmy@GMAIL.com  "));
bookingsSample.push({ confirmation: "F20019-SFO-20250824-0900" }); // no email 
console.log(findBooking(bookingsSample, "F20019-SFO-20250824-0900", "whoever@example.com")); // expect {found:false}


const rawBookingJson = fs.readFileSync(bookingFilePath, "utf8");

const bookingArray = JSON.parse(rawBookingJson);
console.log(bookingArray);
