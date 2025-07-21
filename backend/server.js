const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// Email route
app.post("/send-location-email", async (req, res) => {
    const { latitude, longitude, userAgent, ip } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).send("Invalid location data");
    }

    const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // Setup transporter
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "sumitprasad035@gmail.com",
            pass: "kdby lqfs gxrj wbqf" // Use Gmail App Password
        }
    });

    const mailOptions = {
        from: "sumitprasad035@gmail.com",
        to: "sumitprasad035@gmail.com",
        subject: "New User Location",
        html: `
            <h2>New User Location</h2>
            <p><b>Latitude:</b> ${latitude}</p>
            <p><b>Longitude:</b> ${longitude}</p>
            <p><a href="${googleMapsLink}" target="_blank">View on Google Maps</a></p>
            <hr>
            <p><b>User Agent:</b> ${userAgent || "Not Available"}</p>
            <p><b>IP Address:</b> ${ip || "Not Available"}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent with location:", latitude, longitude);
        res.json({ success: true });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Email failed");
    }
});

// Dynamic port for Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
