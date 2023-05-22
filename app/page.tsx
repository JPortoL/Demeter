import React from "react";
import "./styles.css";
import ImageUploader from "./componets/ImageUploader";

const App: React.FC = () => {
  return (
    <div className="body">
      <div className="container">
        <h1 className="title"><strong>Deméter</strong> </h1>
        <h2 className="subtitle">
        ¡La app con la que por fin podrás distinguir perejil y cilantro!
        </h2>
        <h3>
          Recomendación: Sube imágenes en dónde se vean claramente las hojas
        </h3>
        <ImageUploader/>
        <div className="nota"> 
        <h4> 
          <strong> Nota: </strong>
          La primera carga de una imagen puede demorar debido al tiempo que el modelo de
          HuggingFace necesita para cargar. Si esto ocurre, espere al menos 20 segundos y, si no aparece la 
          predicción, al actualizar la página todo funcionará correctamente.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default App;
