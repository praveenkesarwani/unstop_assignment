const seatModel = require("../models/seatModel");
const SEATS_PER_ROW = 7;
const getAllSeats = async (req, res) => {
  try {
    const seats = await seatModel.getAllSeats();
    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch seats" });
  }
};

const reserveSeats = async (req, res) => {
  const { seatsToReserve } = req.body;
  try {
    if (seatsToReserve > SEATS_PER_ROW) {
      return res.status(400).json({ error: "You can reserve up to 7 seats at a time" });
    }
    // Get available seats
    const availableSeats = await seatModel.getAvailableSeats();
    // Check if enough seats are available
    if (availableSeats.length >= seatsToReserve) {
      // Check if consecutive seats in one row are available
      let consecutiveSeats = [];
      for (let i = 0; i < availableSeats.length; i++) {
        const seat = availableSeats[i];
        if (consecutiveSeats.length === 0 || seat.seat_number === consecutiveSeats[consecutiveSeats.length - 1].seat_number + 1) {
          consecutiveSeats.push(seat);
          if (consecutiveSeats.length === seatsToReserve) {
            break;
          }
        } else {
          consecutiveSeats = [seat];
        }
      }

      // If consecutive seats are available, reserve them
      if (consecutiveSeats.length === seatsToReserve) {
        const reservedSeats = [];
        for (let i = 0; i < consecutiveSeats.length; i++) {
          const seat = consecutiveSeats[i];
          await seatModel.reserveSeat(seat.id);
          reservedSeats.push(seat);
        }
        const seatsBooked = reservedSeats.map((seat) => {
          return {
            seat_number: seat.id,
          };
        });

        return res.status(200).json({ message: "Successfully Booked", seats: seatsBooked });
      }

      // If consecutive seats are not available, reserve nearby seats
      const nearbySeats = availableSeats.slice(0, seatsToReserve);
      for (let i = 0; i < nearbySeats.length; i++) {
        const seat = nearbySeats[i];
        await seatModel.reserveSeat(seat.id);
      }
      const seatsBooked = nearbySeats.map((seat) => {
        return {
          seat_number: seat.id,
        };
      });

      return res.status(200).json({ message: "Successfully Booked", seats: seatsBooked });
    } else {
      return res.status(400).json({ message: "Insufficient seats available" });
    }
  } catch (error) {
    throw new Error("Error reserving seats");
  }
};

module.exports = {
  getAllSeats,
  reserveSeats,
};
