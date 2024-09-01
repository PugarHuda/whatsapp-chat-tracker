const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

let qrCodeData = null;
let qrCodeGeneratedAt = null; // Track when QR code was generated

const client = new Client();

client.on("qr", (qr) => {
  console.log("QR code received");
  qrcode.toDataURL(qr, (err, url) => {
    if (err) {
      console.error("Failed to generate QR code:", err);
    } else {
      qrCodeData = url;
      qrCodeGeneratedAt = new Date(); // Update time when QR code was generated
      console.log("QR code generated:", qrCodeData);
    }
  });
});

client.on("ready", () => {
  console.log("Client is ready!");
  qrCodeData = null; // QR code is not available once client is ready
  qrCodeGeneratedAt = null;
});

client.on("auth_failure", () => {
  console.log("Authentication failed. Please scan the QR code again.");
  qrCodeData = null; // Clear QR code data on auth failure
  qrCodeGeneratedAt = null;
});

client.initialize();

module.exports = client;
