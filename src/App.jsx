import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Tarea from "./components/Tarea";
import Beneficios from "./components/Beneficios";
import Modal from "./components/Modal";
import { Helmet } from "react-helmet";


function App() {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    cedula: '',
    direccion: '',
    ciudad: '',
    barrio: '',
    departamento: '',
    producto: {
      modelo: 'Jordan Cadence',
      color: '',
      talla: '',
      cantidad: 1,
      precio: 90.000
    }
  });

  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const agregarPedido = (pedido) => {
    setPedidos([pedido, ...pedidos]);
    setForm({
      nombre: '',
      telefono: '',
      cedula: '',
      direccion: '',
      ciudad: '',
      barrio: '',
      departamento: '',
      producto: {
        modelo: 'Jordan Cadence',
        color: '',
        talla: '',
        cantidad: 1,
        precio: 90.000
      }
    });
    setMostrarResumen(true);
    setMostrarModal(false);
  };

  const eliminarPedido = (id) => {
    const actualizados = pedidos.filter((p) => p.id !== id);
    setPedidos(actualizados);
  };

  const editarPedido = (pedido) => {
    setForm(pedido);
    eliminarPedido(pedido.id);
    setMostrarModal(true);
  };

  return (
   <>
      <Helmet>
        <title>Jordan Cadence - Cool Store</title>
        <meta name="description" content="Compra Jordan Cadence originales con envío gratis. Paga al recibir. ¡Promoción por tiempo limitado!" />
        <meta name="keywords" content="Jordan, zapatillas, envío gratis, pago contraentrega, paga al recibir" />
        <meta property="og:title" content="Jordan Cadence ⭐⭐⭐⭐⭐" />
        <meta property="og:description" content="Jordan Cadence originales con envío gratis a toda Colombia. ¡Solo por tiempo limitado!" />
        <meta property="og:image" content="https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749671297/Sin_t%C3%ADtulo-1_izeo95.png" />
        <meta property="og:url" content="https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749671297/Sin_t%C3%ADtulo-1_izeo95.png" />
      </Helmet>
      <div className="contenedor">
        <div className="fondoAmarillo">
          <p className="envioGratis">🚚 Envío Gratis a todo el país / 💵 Pagas al recibir</p>
        </div>

        <div className="contenido">
          {/* 🟢 Columna izquierda */}
          <div className="columnaIzquierda">
            <div className="mensajeMarketing">
              <h1><strong>Jordan Cadence ⭐⭐⭐⭐⭐</strong></h1>
              <hr />
              <h2>¡Descubre el estilo y confort!</h2>
            <p className="precioEnvio">
                <strong> 90.000 COP</strong>
                <button className="envioGratisBtn">ENVÍO GRATIS</button>
              </p>
            </div>
            <hr />
            {/* Opciones de color y talla */}
            <div className="selector-colores">
              <p><strong>Colores disponibles:</strong></p>
              <div className="botones-colores">
                {[
                  { nombre: "Negro", codigo: "#000000" },
                  { nombre: "Blanco", codigo: "#ffffff" },
                  { nombre: "Rojo", codigo: "#ff0000" },
                ].map((colorObj) => (
                  <button
                    key={colorObj.nombre}
                    onClick={() =>
                      setForm({
                        ...form,
                        producto: { ...form.producto, color: colorObj.nombre }
                      })
                    }
                    className={`boton-color ${form.producto.color === colorObj.nombre ? 'activo' : ''}`}
                  >
                    <span
                      className="circulo-color"
                      style={{ backgroundColor: colorObj.codigo }}
                    ></span>
                    {colorObj.nombre}
                  </button>
                ))}
              </div>
            </div>

            <div className="talla-wrapper">
              <label className="talla-label">Talla:</label>
              <select
                value={form.producto.talla}
                onChange={(e) =>
                  setForm({
                    ...form,
                    producto: { ...form.producto, talla: parseInt(e.target.value) }
                  })
                }
                className="talla-select"
              >
                <option value="">Selecciona talla</option>
                {[37, 38, 39, 40, 41, 42, 43].map((talla) => (
                  <option key={talla} value={talla}>
                    {talla}
                  </option>
                ))}
              </select>
            </div>
              
            
            {mostrarResumen && pedidos.length > 0 && (
              <div className="resumenPedidos">
                <h2>📝 Pedidos Realizados</h2>
                {pedidos.map((pedido) => (
                  <Tarea
                    key={pedido.id}
                    form={pedido}
                    mostrarResumen={true}
                    onEliminar={() => eliminarPedido(pedido.id)}
                    onEditar={() => editarPedido(pedido)}
                  />
                ))}
              </div>
            )}
          <button className="botonFlotante" onClick={() => setMostrarModal(true)}>
              PAGO CONTRA ENTREGA
            </button>
            
  
          </div>

          {/* 🔵 Columna derecha */}
          <div className="columnaDerecha">
            <Card />
          

            {/* Solo visible en móvil */}
            
          </div>
        </div>

        {/* Modal flotante */}
        <Modal
          visible={mostrarModal}
          onClose={() => setMostrarModal(false)}
          form={form}
          setForm={setForm}
          onPagoContraentrega={(pedidoCompleto) => {
            agregarPedido({
              ...pedidoCompleto,
              id: Date.now()
            });
          }}
        />

        <div className="beneficios-movil">
              <Beneficios />
        </div>

        <a
          href="https://wa.link/e0ybql"
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
          >
          <img class="wh" src="https://res.cloudinary.com/dvs0wzs9a/image/upload/v1749672494/whatsapp.vector_qadxf2.png" alt="whatsapp" />
        </a>

      </div>
   </> 
  );
}

export default App;
