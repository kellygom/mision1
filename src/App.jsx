import { useState } from "react";
import "./App.css";
import Registro from "./components/Registro";
import Card from "./components/Card";
import Tarea from "./components/Tarea";
import Beneficios from "./components/Beneficios";
import Modal from "./components/Modal";

function App() {
 const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    barrio: '',
    departamento: '',
    producto: {
      modelo: 'UltraFlex Pro',
      color: 'Negro',
      talla: 42,
      cantidad: 1,
      precio: 150000
    }
  });



  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para modal

  const agregarPedido = (pedido) => {
    setPedidos([pedido, ...pedidos]);
    setForm({
      nombre: '',
      telefono: '',
      cedula: '',
      direccion: '',
      barrio: '',
      ciudad: '',
      departamento: '',
      modelo: 'ARMANI EXCHANGE',
      color: '',
      talla: '',
      cantidad: 0,
      precio: 90000
    });
    setMostrarResumen(true);
    setMostrarModal(false); // Cierra el modal
  };

  const eliminarPedido = (id) => {
    const actualizados = pedidos.filter((p) => p.id !== id);
    setPedidos(actualizados);
  };

  const editarPedido = (pedido) => {
    setForm(pedido);
    eliminarPedido(pedido.id);
    setMostrarModal(true); // Reabre el modal con datos cargados
  };

  return (
    <div className="contenedor">
      <div className="fondoAmarillo">
        <p className="envioGratis">🚚 Envío Gratis a todo el país / 💵 Pagas al recibir</p>
      </div>

      <div className="contenido">
        <Card />

        <div className="columnaFormulario">
          <Registro />
          <Beneficios />

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
        </div>
      </div>

      {/* ✅ Botón que abre el modal */}
      <button onClick={() => setMostrarModal(true)}>
        PAGO CONTRA ENTREGA
      </button>

      {/* ✅ Modal con Formulario */}
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
    </div>
  );
}

export default App;
