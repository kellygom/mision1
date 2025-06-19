import styles from "./Formulario.module.css";

function Formulario({ form, setForm, agregarPedido }) {
  const seleccionarColor = (color) => setForm({ ...form, color });
  const seleccionarTalla = (talla) => setForm({ ...form, talla });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarPedido(); // ✅ Agrega el pedido al estado
    alert("Pedido enviado correctamente");
  };

  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      <h1>ARMANI EXCHANGE</h1>
      <p className={styles.precio}>$90.000 <span>ENVÍO GRATIS</span></p>

      <label>Color:</label>
      <div className={styles.gridOpciones}>
        {["NEGRO ROJO", "BLANCO ROJO", "NEGRO", "BLANCO"].map((c) => (
          <button
            type="button"
            key={c}
            onClick={() => seleccionarColor(c)}
            className={form.color === c ? styles.activo : ""}
          >
            {c}
          </button>
        ))}
      </div>
      <p>Color seleccionado: <strong>{form.color}</strong></p>

      <label>Talla:</label>
      <div className={styles.gridOpciones}>
        {[37, 38, 39, 40, 41, 42, 43].map((t) => (
          <button
            type="button"
            key={t}
            onClick={() => seleccionarTalla(t)}
            className={form.talla === t ? styles.activo : ""}
          >
            {t}
          </button>
        ))}
      </div>
      <p>Talla seleccionada: <strong>{form.talla}</strong></p>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre completo"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="telefono"
        placeholder="Celular"
        value={form.telefono}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="cedula"
        placeholder="Cédula"
        value={form.cedula}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={form.direccion}
        onChange={handleChange}
      />
      <input
        type="text"
        name="barrio"
        placeholder="Barrio"
        value={form.barrio}
        onChange={handleChange}
      />
      <input
        type="text"
        name="ciudad"
        placeholder="Ciudad"
        value={form.ciudad}
        onChange={handleChange}
      />
      <input
        type="text"
        name="departamento"
        placeholder="Departamento"
        value={form.departamento}
        onChange={handleChange}
      />

      <button className={styles.botonEnvio} type="submit">
        PAGO CONTRA ENTREGA
      </button>
    </form>
  );
}

export default Formulario;


