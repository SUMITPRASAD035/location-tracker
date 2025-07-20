const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Email route
app.post("/send-location-email", async (req, res) => {
    console.log("Received location data:", req.body);

    const { latitude, longitude } = req.body;

    // No condition check, send email regardless
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "sumitprasad035@gmail.com", // Your email
            pass: "kdby lqfs gxrj wbqf"       // App password
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
        console.log("Email sent successfully!");
        res.send({ success: true });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Email failed");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
