import styles from "./Tarea.module.css";

function Tarea({ form, mostrarResumen, onEliminar, onEditar }) {
  return (
    <div className={styles.beneficios}>
      <p><strong>¡Elegancia y comodidad en cada paso!</strong> 🔥</p>
      <ul>
        <li>✅ Diseño moderno y versátil</li>
        <li>✅ Perfecto para oficina, eventos o uso diario</li>
        <li>✅ Materiales de alta calidad y suela antideslizante</li>
        <li>✅ Envío gratis a todo el país</li>
        <li>✅ Pago contraentrega disponible</li>
      </ul>

      {mostrarResumen && (
        <div className={styles.resumen}>
          <h3>Resumen del Pedido</h3>
          <ul>
            <li><strong>Nombre:</strong> {form.nombre}</li>
            <li><strong>Teléfono:</strong> {form.telefono}</li>
            <li><strong>Cédula:</strong> {form.cedula}</li>
            <li><strong>Dirección:</strong> {form.direccion}</li>
            <li><strong>Barrio:</strong> {form.barrio}</li>
            <li><strong>Ciudad:</strong> {form.ciudad}</li>
            <li><strong>Departamento:</strong> {form.departamento}</li>
            <li><strong>Color:</strong> {form.color}</li>
            <li><strong>Talla:</strong> {form.talla}</li>
          </ul>

          <div className={styles.botones}>
            <button onClick={onEditar} className={styles.botonEditar}>✏️ Editar</button>
            <button onClick={onEliminar} className={styles.botonEliminar}>🗑️ Eliminar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tarea;


