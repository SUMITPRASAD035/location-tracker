const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// Serve your frontend index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Email route
app.post("/send-location-email", async (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).send("Invalid location data");
    }

    // Configure Nodemailer
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "sumitprasad035@gmail.com", // your email
            pass: "kdby lqfs gxrj wbqf"       // your app password
        }
    });

    const mailOptions = {
        from: "sumitprasad035@gmail.com",
        to: "sumitprasad035@gmail.com",
        subject: "New Geolocation Captured",
        text: `Latitude: ${latitude}, Longitude: ${longitude}`
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
