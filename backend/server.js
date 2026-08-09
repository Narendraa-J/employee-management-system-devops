require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./database/db");
app.use(cors());
app.use(express.json());
const employeeroutes=require("./routes/employeeroute");
const PORT = 5000;
app.use("/employees",employeeroutes)
app.get("/", (req, res) => {
    res.send("Employee Management API is Running...");
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

