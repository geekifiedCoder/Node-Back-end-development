const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

// Load SSL certificates
const key = fs.readFileSync(path.resolve(__dirname, "server.key"));
const cert = fs.readFileSync(path.resolve(__dirname, "server.cert"));

// Create an Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Example API endpoint
app.get("/", (req, res) => {
    res.send("Welcome to the HTTPS API!");
});

app.get("/api/data", (req, res) => {
    res.json({ message: "Secure data response", data: [1, 2, 3, 4] });
});

// Create an HTTPS server
const httpsServer = https.createServer({ key, cert }, app);

// Start the server

const PORT = 8443;
httpsServer.listen(PORT, () => {
    console.log(`HTTPS Server running on https://localhost:${PORT}`);
});
