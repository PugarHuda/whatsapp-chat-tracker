"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonDefault from "@/components/Buttons/ButtonDefault";

const QRTable = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQRCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/whatsapp-qr");
      if (response.data.qrCode) {
        const qrCodeBase64 = response.data.qrCode.startsWith(
          "data:image/png;base64,",
        )
          ? response.data.qrCode
          : `data:image/png;base64,${response.data.qrCode}`;
        setQrCode(qrCodeBase64);
      } else {
        setError("QR Code not available. Please try again later.");
      }
    } catch (error) {
      console.error("Failed to fetch QR Code:", error);
      setError("Failed to fetch QR Code. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQRCode();

    const intervalId = setInterval(() => {
      fetchQRCode();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div>
        <ButtonDefault
          label={loading ? "Loading..." : "Show WhatsApp QR Code"}
          link="#"
          customClasses="bg-blue-500 text-white"
          onClick={fetchQRCode}
          disabled={loading}
        >
          {loading && <span className="loader"></span>}
        </ButtonDefault>
        <ButtonDefault
          label="Refresh QR Code"
          link="#"
          customClasses="bg-green-500 text-white"
          onClick={fetchQRCode}
        />
      </div>
      {error && <p>{error}</p>}
      {qrCode && (
        <img
          src={qrCode}
          alt="WhatsApp QR Code"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      )}
      <style jsx>{`
        .loader {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #3498db;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        button:disabled .loader {
          border-top-color: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default QRTable;
