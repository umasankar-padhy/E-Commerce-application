const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/stripe", require("./routes/stripeRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
