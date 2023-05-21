import React from "react";
import "./styles.css";
import ImageUploader from "./componets/ImageUploader";

const App: React.FC = () => {
  return (
    <div className="container">
      <h1 className="title">Démeter</h1>
      <h2 className="subtitle">
      ¡La app con la que por fin podrás distinguir perejil y cilantro!
      </h2>
      <h3>
        Recomendación: Sube imágenes en dónde se vean claramente las hojas
      </h3>
      <ImageUploader/>
    </div>
  );
};

export default App;
