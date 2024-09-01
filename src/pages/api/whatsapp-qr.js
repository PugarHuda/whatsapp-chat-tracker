import { Client } from "whatsapp-web.js";
import qrcode from "qrcode";

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

export default function handler(req, res) {
  console.log("API Request received");

  if (qrCodeData && qrCodeGeneratedAt) {
    const currentTime = new Date();
    const elapsed = (currentTime - qrCodeGeneratedAt) / 1000; // Calculate elapsed time in seconds

    if (elapsed < 300) {
      // 5 minutes
      console.log("QR code sent to client");
      res.status(200).json({ qrCode: qrCodeData });
    } else {
      console.log("QR Code expired");
      qrCodeData = null; // Clear expired QR code data
      qrCodeGeneratedAt = null;
      res.status(404).json({ message: "QR Code expired" });
    }
  } else {
    console.log("QR Code not available");
    res.status(404).json({ message: "QR Code not available" });
  }
}
