import styles from './Formulario.module.css';

function Formulario({ form, setForm, onPagoContraentrega }) {
  const { producto } = form;

  // Manejo de campos generales
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Manejo de campos del producto
  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      producto: {
        ...producto,
        [name]: ['talla', 'cantidad'].includes(name) ? parseInt(value) || '' : value
      }
    });
  };

  // Control para limitar la cantidad a 1 o 2
  const handleCantidadChange = (e) => {
    let valor = parseInt(e.target.value);
    if (isNaN(valor)) valor = 1;
    valor = Math.min(2, Math.max(1, valor));
    setForm({
      ...form,
      producto: { ...producto, cantidad: valor }
    });
  };

  // Calcular total dinámico
  const calcularTotal = () => {
    const { cantidad } = producto;
    const precioUnitario = 90000;
    return cantidad === 2 ? 160000 : cantidad * precioUnitario;
  };

  // Enviar datos a backend
  const enviarDatos = async () => {
    try {
      const respuesta = await fetch("https://landing-backend-1-v2eh.onrender.com/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!respuesta.ok) throw new Error("Error al enviar datos");

      const resultado = await respuesta.json();
      console.log("✅ Pedido enviado:", resultado);
      alert("✅ ¡Tu pedido fue registrado exitosamente!");

      onPagoContraentrega({ ...form, id: Date.now() });

      // Reiniciar
      setForm({
        nombre: '',
        cedula: '',
        telefono: '',
        direccion: '',
        barrio: '',
        ciudad: '',
        departamento: '',
        producto: {
          modelo: 'UltraFlex Pro',
          color: '',
          talla: '',
          cantidad: 1,
          precio: 90000
        }
      });

    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Hubo un error al enviar tu pedido. Intenta más tarde.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    enviarDatos();
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

      {/* Datos personales */}
      <fieldset>
        <legend>🧍 Datos Personales</legend>
        <input name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange} required />
        <input name="cedula" placeholder="Cédula" value={form.cedula} onChange={handleChange} required />
        <input name="telefono" placeholder="Celular" value={form.telefono} onChange={handleChange} required />
      </fieldset>

      {/* Dirección */}
      <fieldset>
        <legend>📦 Dirección de Envío</legend>
        <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} />
        <input name="barrio" placeholder="Barrio" value={form.barrio} onChange={handleChange} />
        <input name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} />
        <input name="departamento" placeholder="Departamento" value={form.departamento} onChange={handleChange} />
      </fieldset>

      {/* Producto */}
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
              className={`${styles.colorOption} ${form.producto.color === colorObj.nombre ? styles.activo : ""}`}
            >
              <span className={styles.colorCircle} style={{ backgroundColor: colorObj.codigo }}></span>
              {colorObj.nombre}
            </button>
          ))}
        </div>

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
