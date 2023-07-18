// dataModel.js

const { Pool } = require("pg");
const config = require("../../config/config");

const pool = new Pool(config.database);

// Get all seats
const getAllSeats = async () => {
  try {
    const query = "SELECT * FROM seats";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error("Error fetching seats");
  }
};

// Book seats
const bookSeats = async (seatNumbers) => {
  try {
    const query = "UPDATE seats SET is_available = false WHERE seat_number = ANY($1::int[]) AND is_available = true";
    const values = [seatNumbers];
    await pool.query(query, values);
  } catch (error) {
    throw new Error("Error booking seats");
  }
};

const getAvailableSeats = async () => {
  try {
    const query = `
      SELECT *
      FROM seats
      WHERE is_available = true
      order by id
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error("Error fetching seats");
  }
};

const reserveSeat = async (seatId) => {
  try {
    const query = `
      UPDATE seats
      SET is_available = false
      WHERE id = $1
    `;
    await pool.query(query, [seatId]);
  } catch (error) {
    throw new Error("Error reserving seat");
  }
};

module.exports = {
  getAllSeats,
  bookSeats,
  getAvailableSeats,
  reserveSeat,
};
