
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

const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes);


dbConnect();

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
