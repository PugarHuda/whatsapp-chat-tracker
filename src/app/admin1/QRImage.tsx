import React from "react";
import Image from "next/image";

interface QRImageProps {
  base64Data: string;
}

const QRImage: React.FC<QRImageProps> = ({ base64Data }) => {
  return (
    <div style={{ width: "200px", height: "200px", position: "relative" }}>
      <Image
        src={`data:image/png;base64,${base64Data}`}
        alt="QR Code"
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
};

export default QRImage;
