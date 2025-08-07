// priceLogic.js
// This module functionality simulates the price calculation for seats.

import { randomInt } from "crypto";

export function calculatePrice(price,selectedSeats,seatMap) 
{
    let totalPrice = price;
    let basePrice = randomInt(300,450);
    const unavailableSeats = [];
    let invalidSeats = [];
    let validSeats = 0;
    for (const seatLabel of selectedSeats)
    {
        let seatFound = false;
        for(const row of seatMap)
        {
            const seat = row.find(s => s.label === seatLabel);
            if (seat)
            {
                seatFound = true;
                if (seat.occupied) 
                {
                    unavailableSeats.push(seatLabel);
                }
                else
                {
                    totalPrice += basePrice;
                    validSeats++;
                    seat.occupied = true;
                }
                break;
            }
        }
        if (!seatFound) 
        {
            invalidSeats.push(seatLabel);
        }
    }
      if (invalidSeats.length > 0) {
    return {
      success: false,
      totalPrice: 0,
      message: `Seat(s) ${invalidSeats.join(", ")} do not exist.`
    };
}
    if (unavailableSeats.length > 0) {
    return {
      success: false,
      totalPrice: 0,
      message: `Seat(s) ${unavailableSeats.join(", ")} are already occupied.`
    };
  }
  return {
    success: true,
    totalPrice,
    message: `Total price for ${validSeats} seat(s): $${totalPrice}`
  };
}