// Importar lo necesario
import React from "react";
import "./styles.css";
import ImageUploader from "./componets/ImageUploader";

// Crear función para mostrar el HTML
const App: React.FC = () => {
  return (
    <div className="body">
      <div className="container">
        {/* Añadir "Deméter" como título */}
        <h1 className="title"><strong>Deméter</strong> </h1>
        {/* Añadir Subtítulo */}
        <h2 className="subtitle">
          ¡La app con la que por fin podrás distinguir perejil y cilantro!
        </h2>
        {/* Recomendación */}
        <h3>
          Recomendación: Sube imágenes en donde se vean claramente las hojas
        </h3>
        {/* Componente de carga de imágenes */}
        <ImageUploader />
        <div className="nota">
          {/* Añadir una nota sobre la demora en la predicción */}
          <h4>
            <strong>Nota:</strong> La primera predicción de una imagen puede demorar debido al tiempo que el modelo de HuggingFace necesita para cargar. Si esto ocurre, espere al menos 20 segundos y, si aún no aparece la predicción, actualizar la página hará que todo funcione correctamente.
          </h4>
        </div>
      </div>
    </div>
  );
};

// Exportar función
export default App;

