import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

function QRCodeScanner() {
  const [scannedResult, setScannedResult] = useState('No QR Code detected');
  const [isScanning, setIsScanning] = useState(false);
  const webcamRef = useRef(null);

  const handleScan = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          setScannedResult(code.data);
          setIsScanning(false);
        } else {
          setScannedResult('No QR Code detected');
        }
      };
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QR Code Scanner</h1>
      {isScanning ? (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            style={{ width: '300px', height: '300px' }}
          />
          <button onClick={handleScan} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
            Scan Now
          </button>
        </div>
      ) : (
        <button onClick={() => setIsScanning(true)} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Start Scanning
        </button>
      )}
      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>Scanned Result: {scannedResult}</p>
    </div>
  );
}

export default QRCodeScanner;
