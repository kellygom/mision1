import styles from './Formulario.module.css';
import { useState } from 'react';

function Formulario({ form, setForm, onPagoContraentrega }) {
  const [productos, setProductos] = useState([
    { 
      modelo: 'Jordan Cadence',
      color: '',
      talla: '',
      cantidad: 1
    }
  ]);

  // Manejo de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleProductoChange = (index, e) => {
    const { name, value } = e.target;
    const nuevosProductos = [...productos];
    nuevosProductos[index] = {
      ...nuevosProductos[index],
      [name]: value
    };
    setProductos(nuevosProductos);
  };

  // Agregar segundo par
  const agregarProducto = () => {
    if (productos.length >= 2) return;
    setProductos([
      ...productos,
      {
        modelo: 'Jordan Cadence',
        color: '',
        talla: '',
        cantidad: 1
      }
    ]);
  };

  // Eliminar producto
  const eliminarProducto = (index) => {
    if (productos.length <= 1) return;
    setProductos(productos.filter((_, i) => i !== index));
  };

  // Calcular total
  const calcularTotal = () => {
    const totalPares = productos.reduce((sum, p) => sum + p.cantidad, 0);
    return totalPares === 2 ? 160000 : totalPares * 90000;
  };

  // Enviar datos
  const enviarDatos = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://landing-backend-1-v2eh.onrender.com/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente: form,
          productos,
          total: calcularTotal()
        })
      });
      if (!res.ok) throw new Error('Error al enviar');
      alert('Pedido registrado!');
      onPagoContraentrega({ ...form, productos, id: Date.now() });
    } catch (error) {
      console.error(error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <form className={styles.formulario} onSubmit={enviarDatos}>
      <h2>🛍️ Finalizar Compra</h2>

      {/* Datos Personales */}
      <fieldset>
        <legend>🧍 Datos Personales</legend>
        <input name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange} required />
        <input name="cedula" placeholder="Cédula" value={form.cedula} onChange={handleChange} required />
        <input name="telefono" placeholder="Celular" value={form.telefono} onChange={handleChange} required />
      </fieldset>

      {/* Dirección */}
      <fieldset>
        <legend>📦 Dirección de Envío</legend>
        <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
        <input name="barrio" placeholder="Barrio" value={form.barrio} onChange={handleChange} required />
        <input name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} required />
        <input name="departamento" placeholder="Departamento" value={form.departamento} onChange={handleChange} required />
      </fieldset>

      {/* Productos */}
      {productos.map((producto, index) => (
        <fieldset key={index} className={styles.productoFieldset}>
          <legend>👟 Par {index + 1}</legend>

          <label>Color:</label>
          <div className={styles.gridOpciones}>
            {['Negro', 'Blanco', 'Rojo'].map(color => (
              <button
                type="button"
                key={color}
                onClick={() => handleProductoChange(index, { 
                  target: { name: 'color', value: color } 
                })}
                className={`${styles.colorOption} ${producto.color === color ? styles.activo : ""}`}
              >
                <span 
                  className={styles.colorCircle} 
                  style={{ 
                    backgroundColor: color === 'Negro' ? '#000' : 
                                  color === 'Blanco' ? '#fff' : '#f00',
                    border: color === 'Blanco' ? '1px solid #ddd' : 'none'
                  }} 
                />
                {color}
              </button>
            ))}
          </div>

          <label>Talla:</label>
          <select
            name="talla"
            value={producto.talla}
            onChange={(e) => handleProductoChange(index, e)}
            className={styles.select}
            required
          >
            <option value="">Seleccionar talla</option>
            {[37, 38, 39, 40, 41, 42, 43].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {productos.length > 1 && (
            <button
              type="button"
              onClick={() => eliminarProducto(index)}
              className={styles.eliminarBtn}
            >
              ✖ Eliminar este par
            </button>
          )}
        </fieldset>
      ))}

      {/* Resumen */}
      <div className={styles.resumen}>
        <h3>Resumen</h3>
        {productos.map((p, i) => (
          <div key={i} className={styles.resumenProducto}>
            <p><strong>Par {i + 1}:</strong> {p.color || 'Sin color'} - Talla {p.talla || 'Sin talla'}</p>
          </div>
        ))}
        <p className={styles.total}>Total a pagar: ${calcularTotal().toLocaleString()}</p>
        {productos.length < 2 && (
          <button 
            type="button" 
            onClick={agregarProducto}
            className={styles.agregarBtn}
          >
            ➕ Agregar segundo par (2x$160.000)
          </button>
        )}
      </div>

      <button type="submit" className={styles.botonConfirmar}>
        ✅ Confirmar Pedido
      </button>
    </form>
  );
}

export default Formulario;