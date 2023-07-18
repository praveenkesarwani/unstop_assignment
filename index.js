const express = require("express");
const app = express();
const seatRoutes = require("./app/routes/seatRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/seats", seatRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
