import { useState } from "react";
import styles from "./Card.module.css";

function Card() {
  const gifPrincipal = "https://res.cloudinary.com/dvs0wzs9a/image/upload/v1751667394/NUEVO_GIF_b7suc9.gif"; // ← tu gif aquí

  const imagenes = [
    "https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749671297/Sin_t%C3%ADtulo-1_izeo95.png",
    "https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749672096/Sin_t%C3%ADtulo-11_1_smhh6v.png",
    "https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749672080/Sin_t%C3%ADtulo-10_1_e9bzvn.png",
    "https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749672064/Sin_t%C3%ADtulo-9_1_uhwkxs.png",
    "https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749672032/Sin_t%C3%ADtulo-4_hdvgvy.png",
    "https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749672019/Sin_t%C3%ADtulo-3_pzir76.png",
    "https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749671999/Sin_t%C3%ADtulo-2_uxl2j3.png"
  ];

  const [imagenPrincipal, setImagenPrincipal] = useState(gifPrincipal); // ← gif por defecto

  return (
    <div className={styles.producto}>
      {/* Imagen principal */}
      <img
        src={imagenPrincipal}
        alt="Imagen del producto"
        className={styles.imagenFondo}
      />

      {/* Miniaturas (sin el GIF) */}
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

