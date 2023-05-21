// Importar librerias
"use client";
import { useState, useRef } from 'react';
import fetch from 'isomorphic-fetch';

export default function ImageUploader() {
  // Estado para almacenar el resultado de la predicción
  const [result, setResult] = useState(null);
  // Estado para controlar el estilo cuando se arrastra un archivo sobre el componente
  const [dragOver, setDragOver] = useState(false);
  // Estado para controlar el mensaje de carga
  const [loading, setLoading] = useState(false);
  // Referencia al elemento de imagen
  const imageRef = useRef(null);

  // Maneja el evento de carga de archivo
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    await processImage(file);
  };

  // Maneja el evento de arrastrar un archivo sobre el componente
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  // Maneja el evento de salir de la zona de arrastre
  const handleDragLeave = () => {
    setDragOver(false);
  };

  // Maneja el evento de soltar un archivo sobre el componente
  const handleDrop = async (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    await processImage(file);
  };

  // Procesa la imagen enviándola al modelo de predicción
  const processImage = async (file) => {
    setLoading(true); // Activa el mensaje de carga
    // Lee el archivo como un ArrayBuffer
    const data = await readFileAsArrayBuffer(file);
    // Envía la imagen al modelo de predicción
    const response = await fetch(
      "https://api-inference.huggingface.co/models/JesusPorto/Demeter",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: data,
      }
    );
    // Obtiene la predicción del modelo
    const prediction = await response.json();
    setResult(prediction);
    setLoading(false); // Desactiva el mensaje de carga

    // Guarda la URL de la imagen y la asigna al elemento de imagen
    const imageURL = URL.createObjectURL(file);
    imageRef.current.src = imageURL;
  };

  // Lee el archivo como un ArrayBuffer
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
      {/* Componente para arrastrar y soltar una imagen */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ border: dragOver ? '2px dashed black' : '2px solid black', padding: '1rem' }}
      >
        {loading ? (
          <div>Cargando...</div> // Muestra el mensaje de carga
        ) : (
          <div>Arrastra y suelta una imagen aquí</div>
        )}
      </div>
      <br />
      {/* Input para seleccionar un archivo */}
      <input type="file" onChange={handleFileUpload} />
      {/* Muestra el resultado de la predicción si existe */}
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
      {/* Muestra la imagen ingresada si existe */}
      {result && result.length != null && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <h3>Imagen ingresada:</h3>
          <img ref={imageRef} alt="Imagen" style={{ width: 'auto', height: '180px', margin: '0 auto' }} />
        </div>
      )}
    </div>
  );
}
