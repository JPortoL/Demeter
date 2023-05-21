"use client";
import { useState, useRef } from 'react';
import fetch from 'isomorphic-fetch';

export default function ImageUploader() {
  const [result, setResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const imageRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    await processImage(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    await processImage(file);
  };

  const processImage = async (file) => {
    const data = await readFileAsArrayBuffer(file);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/JesusPorto/Demeter",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: data,
      }
    );
    const prediction = await response.json();
    setResult(prediction);

    // Guardar la URL de la imagen
    const imageURL = URL.createObjectURL(file);
    imageRef.current.src = imageURL;
  };

  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (event) => {
        reject(event.target.error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ border: dragOver ? '2px dashed black' : '2px solid black', padding: '1rem' }}
      >
        Arrastra y suelta una imagen aquí
      </div>
      <br />
      <input type="file" onChange={handleFileUpload} />
      {result && Array.isArray(result) && result.length > 0 && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <h3>Resultado de la predicción:</h3>
          <ul>
            {result.map((item, index) => (
              <li key={index}>
                <strong>Porcentaje de {item.label}:</strong> {(item.score * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
      {result && result.length >= 0 && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <h3>Imagen ingresada:</h3>
          <img ref={imageRef} alt="Imagen" style={{ width: 'auto', height: '180px', margin: '0 auto' }} />
        </div>
      )}
    </div>
  );
  
}

