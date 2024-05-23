
const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const dbConnect = require("./config/db");

dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const fileupload = require("express-fileupload");
app.use(fileupload());




app.get("/", (req, res) => {
    res.send("<h2>Welcome to the homepage</h2>");
});

const authRoutes = require("./routes/userRoutes");
app.use("/api/v1/auth", authRoutes);

const addressRoutes = require("./routes/addressRoutes");
app.use("/api/v1/address", addressRoutes);

const merchantRoutes = require("./routes/merchantRoutes");
app.use("/api/v1/merchant", merchantRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/product", productRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/v1/cart", cartRoutes);


dbConnect();

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
