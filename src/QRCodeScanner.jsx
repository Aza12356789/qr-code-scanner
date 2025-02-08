import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader'; // Убедитесь, что это правильный импорт!

function QRCodeScanner() {
  const [result, setResult] = useState('No result');

  const handleScan = (data) => {
    if (data) {
      setResult(data); // Обновляем результат в реальном времени
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QR Code Scanner</h1>
      <div style={{ width: '300px', margin: '0 auto' }}>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              handleScan(result.text); // Вызов функции handleScan
            } else if (error) {
              handleError(error);
            }
          }}
          constraints={{ facingMode: 'environment' }} // Используем заднюю камеру
          style={{ width: '100%' }}
        />
      </div>
      <p><strong>Scanned Result:</strong> {result}</p>
    </div>
  );
}

export default QRCodeScanner;

