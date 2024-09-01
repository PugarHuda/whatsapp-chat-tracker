"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import Image from "next/image";

const QRTable = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  const fetchQRCode = async () => {
    console.time("fetchQRCode");
    setLoading(true);
    setError(null);
    setConnected(false);

    try {
      const response = await axios.get("/api/whatsapp-qr");
      if (response.data.qrCode) {
        const qrCodeBase64 = response.data.qrCode.startsWith(
          "data:image/png;base64,",
        )
          ? response.data.qrCode
          : `data:image/png;base64,${response.data.qrCode}`;
        setQrCode(qrCodeBase64);
        setConnected(true);
      } else {
        setError("QR Code not available. Please try again later.");
      }
    } catch (error) {
      console.error("Failed to fetch QR Code:", error);
      setError("Failed to fetch QR Code. Please try again later.");
    } finally {
      setLoading(false);
      console.timeEnd("fetchQRCode");
    }
  };

  useEffect(() => {
    fetchQRCode();

    const intervalId = setInterval(() => {
      fetchQRCode();
    }, 300000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div>
        <button
          className={`bg-blue-500 text-white ${loading ? "relative" : ""}`}
          onClick={() => fetchQRCode()}
          disabled={loading}
        >
          {loading ? "Loading..." : "Show WhatsApp QR Code"}
          {loading && <div className="spinner"></div>}
        </button>
        <button
          className={`bg-green-500 text-white ${loading ? "relative" : ""}`}
          onClick={() => fetchQRCode()}
          disabled={loading}
        >
          Refresh QR Code
          {loading && <div className="spinner"></div>}
        </button>
      </div>
      {connected && <p>Successfully connected!</p>}
      {error && <p>{error}</p>}
      {qrCode && (
        <div style={{ width: "150px", height: "150px", position: "relative" }}>
          <Image
            src={qrCode}
            alt="WhatsApp QR Code"
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
      <style jsx>{`
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #3498db;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
          position: absolute;
          right: 10px;
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

        .relative {
          position: relative;
        }

        button:disabled .spinner {
          border-top-color: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default QRTable;
