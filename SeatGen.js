//SeatGen.js
// This module generates seats to be filled by passengers.
let seatMap = [];
export function generateSeats(rows, columns) 
{
    seatMap = [];
    for (let i = 0; i < rows; i++) 
    {
        let row = [];
        for (let j = 0; j < columns; j++) 
        {
            const columnLetter = String.fromCharCode(65 + j);
            row.push
            ({ 
                label: `${i + 1}${columnLetter}`,
                row: i + 1, 
                column: columnLetter, 
                occupied: false
            });
        }
        seatMap.push(row);
    }
    console.log("Seat map generated with " + rows + " rows and " + columns + " columns.");
}   
export function printSeatMap() 
{
  for (const row of seatMap) 
    {
    const rowDisplay = row.map(seat => 
      `${seat.label}${seat.occupied ? ' (X)' : ' ( )'}`
    ).join("  ");
    console.log(rowDisplay);
  }
}