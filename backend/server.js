const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dataFile = path.join(__dirname, "data.json");
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify([]));

// Configure email transporter (Gmail example)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sumitprasad035@gmail.com",
        pass: "kdby lqfs gxrj wbqf"
    }
});

// Save location
app.post("/save-location", (req, res) => {
    const newData = req.body;
    const data = JSON.parse(fs.readFileSync(dataFile));
    data.push({ ...newData, timestamp: new Date().toISOString() });
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

    // Send email alert
    const mailOptions = {
        from: "sumitprasad035@gmail.com",
        to: "sumitprasad035@gmail.com",
        subject: "New Location Captured",
        text: `Location: ${newData.latitude}, ${newData.longitude}\nIP: ${newData.ip}\nCity: ${newData.city}, ${newData.country}`
    };
    transporter.sendMail(mailOptions, (err) => {
        if (err) console.log("Email Error:", err);
    });

    res.json({ message: "Location saved successfully!" });
});

// Get all locations
app.get("/locations", (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFile));
    res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
