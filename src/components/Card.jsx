import styles from "./Card.module.css";

function Card() {
  return (
    <div className={styles.producto}>
      <img src="https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749672064/Sin_t%C3%ADtulo-9_1_uhwkxs.png" alt="Imagen del producto" className={styles.imagenFondo} />

      <div className={styles.miniaturas}>
        <img src="https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749671297/Sin_t%C3%ADtulo-1_izeo95.png" alt="Mini 1" />
        <img src="https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749672096/Sin_t%C3%ADtulo-11_1_smhh6v.png" alt="Mini 2" />
        <img src="https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749672080/Sin_t%C3%ADtulo-10_1_e9bzvn.png" alt="Mini 3" />
      </div>
    </div>
  );
}

export default Card;
