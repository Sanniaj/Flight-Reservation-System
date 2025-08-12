
/**
 * 
 */


import fs from "fs";
const filePath = "./booking_test.json";


/*
// test array -  list of bookings.
let bookings = [
  { confirmation: "ABC123", name: "Timmy", seat: "1A" },
  { confirmation: "XYZ123", name: "Nova", seat: "1B" }
];
*/
let bookings = [];
console.log("In memory bookings:", bookings);

if (fs.existsSync(filePath)) {
  const text = fs.readFileSync(filePath,"utf8");
  if (text.trim() !== "") {
    bookings = JSON.parse(text);
  }
}

const newBooking = {confirmation:"CFM" + Date.now(), name: "Timmy", seat: "1A"};
bookings.push(newBooking);
console.log("append:", newBooking);


fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2), "utf8");
console.log("Saved bookings to file: booking_test.json", filePath);





























/*
In memory bookings: [
  { confirmation: 'ABC123', name: 'Timmy', seat: '6A' },
  { confirmation: 'XYZ123', name: 'Nova', seat: '7B' }
]
*/


/* TESTING output format 
let jsonText = JSON.stringify(bookings,);
console.log("JSON text version:\n", jsonText);

let jsonText1 = JSON.stringify(bookings, null); //display booking, no filter 
console.log("JSON text version 1:\n", jsonText1);

let jsonText2 = JSON.stringify(bookings, null, 0); //display booking, no filter, no indent, line break
console.log("JSON text version 2:\n", jsonText2);

let jsonText3 = JSON.stringify(bookings, null, 1); 
console.log("JSON text version 3:\n", jsonText3);

let jsonText4 = JSON.stringify(bookings, null, 2);
console.log("JSON text version 4:\n", jsonText4);

let jsonText5 = JSON.stringify(bookings, null, "\t");
console.log("JSON text version 4:\n", jsonText5);


/**
 * JSON.stringify(booking, null, 2);
 * convert JavaScript value to JSON string
 * @param{array} bookings - all bookings in memory
 * @param {null} do nothing here
 * @param {number} spacing - 
*/
// let jsonText4 = JSON.stringify(bookings, null, 2);
// console.log("JSON text version 4:\n", jsonText4);
// fs.writeFileSync(filePath,jsonText4, "utf8");

