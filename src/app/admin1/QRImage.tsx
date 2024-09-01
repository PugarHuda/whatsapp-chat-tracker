import React from "react";

interface QRImageProps {
  base64Data: string;
}

const QRImage: React.FC<QRImageProps> = ({ base64Data }) => {
  return (
    <img
      src={base64Data}
      alt="QR Code"
      style={{ width: "200px", height: "200px" }}
    />
  );
};

export default QRImage;
