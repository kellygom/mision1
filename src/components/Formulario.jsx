import styles from './Formulario.module.css';

function Formulario({ form, setForm, onPagoContraentrega }) {
  const { producto } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      producto: {
        ...producto,
        [name]: name === 'cantidad' || name === 'talla' ? parseInt(value) : value
      }
    });
  };

  const handleCantidadChange = (e) => {
    const valor = Math.min(2, parseInt(e.target.value) || 1);
    setForm({ 
      ...form, 
      producto: { 
        ...producto, 
        cantidad: valor 
      } 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPagoContraentrega({ ...form, id: Date.now() });
  };

  const calcularTotal = () => {
    const cantidad = producto.cantidad;
    const precioUnitario = 90000;
    if (cantidad === 2) return 160000;
    return cantidad * precioUnitario;
  };

  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      <h2>🛍️ Finalizar Compra</h2>

      <div className={styles.resumen}>
        <h3>Resumen del Pedido</h3>
        <p><strong>Modelo:</strong> {producto.modelo}</p>
        <p><strong>Color:</strong> {producto.color}</p>
        <p><strong>Talla:</strong> {producto.talla}</p>
        <p><strong>Cantidad:</strong> {producto.cantidad}</p>
        <p className={styles.total}>
          Total a pagar: <strong>${calcularTotal().toLocaleString('es-CO')}</strong>
        </p>
      </div>

      <fieldset>
        <legend>🧍 Datos Personales</legend>
        <input name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange} required />
        <input name="cedula" placeholder="Cédula" value={form.cedula} onChange={handleChange} required />
        <input name="telefono" placeholder="Celular" value={form.telefono} onChange={handleChange} required />
      </fieldset>

      <fieldset>
        <legend>📦 Dirección de Envío</legend>
        <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} />
        <input name="barrio" placeholder="Barrio" value={form.barrio} onChange={handleChange} />
        <input name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} />
        <input name="departamento" placeholder="Departamento" value={form.departamento} onChange={handleChange} />
      </fieldset>

      <fieldset>
        <legend>👟 Detalles del Producto</legend>

        <label>Color:</label>
          <div className={styles.gridOpciones}>
            {[
              { nombre: "Negro", codigo: "#000000" },
              { nombre: "Blanco", codigo: "#FFFFFF" },
              { nombre: "Rojo", codigo: "#FF0000" }
            ].map((colorObj) => (
              <button
                type="button"
                key={colorObj.nombre}
                onClick={() =>
                  setForm({
                    ...form,
                    producto: { ...form.producto, color: colorObj.nombre }
                  })
                }
                className={`${styles.colorOption} ${
                  form.producto.color === colorObj.nombre ? styles.activo : ""
                }`}
              >
                <span
                  className={styles.colorCircle}
                  style={{ backgroundColor: colorObj.codigo }}
                ></span>
                {colorObj.nombre}
              </button>
            ))}
          </div>


          {/* 👇 Esto muestra el color elegido */}
          {form.producto.color && (
            <p className={styles.colorSeleccionado}>
              Color seleccionado: <strong>{form.producto.color}</strong>
            </p>
          )}



        <label>Talla:</label>
        <select name="talla" value={producto.talla} onChange={handleProductoChange} required>
          <option value="">Seleccionar talla</option>
          {[37, 38, 39, 40, 41, 42, 43].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <label>Cantidad:</label>
        <input
          type="number"
          min={1}
          max={2}
          name="cantidad"
          value={producto.cantidad}
          onChange={handleCantidadChange}
          className={styles.campoCantidad}
          required
        />
        <small>Máximo 2 pares por pedido</small>
      </fieldset>

      <button type="submit">✅ Confirmar Pedido</button>
    </form>
  );
}

export default Formulario;
