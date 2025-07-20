const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Email route
app.post("/send-location-email", async (req, res) => {
    const { latitude, longitude, userAgent, ip } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).send("Invalid location data");
    }

    // Configure Nodemailer
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "sumitprasad035@gmail.com", // Your Gmail
            pass: "kdby lqfs gxrj wbqf"       // App password
        }
    });

    const mailOptions = {
        from: "sumitprasad035@gmail.com",
        to: "sumitprasad035@gmail.com",      // Target email
        subject: "New User Location",
        text: `Coordinates:
Latitude: ${latitude}
Longitude: ${longitude}

User Agent: ${userAgent}
IP: ${ip}`
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
