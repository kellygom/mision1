import { useState } from "react";
import styles from "./Card.module.css";

function Card() {
  // Array de imágenes
  const imagenes = [
    "https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749671297/Sin_t%C3%ADtulo-1_izeo95.png",
    "https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749672080/Sin_t%C3%ADtulo-10_1_e9bzvn.png",
    "https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749672096/Sin_t%C3%ADtulo-11_1_smhh6v.png"
  ];

  // Estado para imagen grande
  const [imagenPrincipal, setImagenPrincipal] = useState(imagenes[0]);

  return (
    <div className={styles.producto}>
      {/* Imagen principal */}
      <img
        src={imagenPrincipal}
        alt="Imagen del producto"
        className={styles.imagenFondo}
      />

      {/* Miniaturas */}
      <div className={styles.miniaturas}>
        {imagenes.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Mini ${index + 1}`}
            className={styles.miniatura}
            onClick={() => setImagenPrincipal(img)}
          />
        ))}
      </div>
    </div>
  );
}

export default Card;

