import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

const QRCodeScanner = () => {
  const webcamRef = useRef(null);
  const [qrCodeData, setQrCodeData] = useState("No QR Code detected");

  const videoConstraints = {
    facingMode: "environment",  // Задает использование задней камеры
  };

  const captureAndScan = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          setQrCodeData(code.data);
        } else {
          setQrCodeData("No QR Code detected");
        }
      };
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>QR Code Scanner</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
      />
      <p><strong>Scanned Result:</strong> {qrCodeData}</p>
      <button onClick={captureAndScan}>Scan QR Code</button>
    </div>
  );
};

export default QRCodeScanner;
