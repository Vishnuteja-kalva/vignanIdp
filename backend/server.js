const connectDB  = require("./config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const foodRouter = require("./routes/foodRoute");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Start Server
app.listen(port, () => {
  console.log(`Server Started on port: ${port}`);
});
