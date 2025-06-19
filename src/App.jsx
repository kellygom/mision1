import { useState } from "react";
import "./App.css";

import Formulario from "./components/Formulario";
import Card from "./components/Card";
import Tarea from "./components/Tarea";

function App() {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    cedula: '',
    direccion: '',
    barrio: '',
    ciudad: '',
    departamento: '',
    color: '',
    talla: ''
  });

  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [pedidos, setPedidos] = useState([]);

  const agregarPedido = () => {
    const nuevoPedido = { ...form, id: Date.now() };
    setPedidos([nuevoPedido, ...pedidos]);
    setForm({
      nombre: '', telefono: '', cedula: '', direccion: '', barrio: '', ciudad: '', departamento: '', color: '', talla: ''
    });
    setMostrarResumen(true);
  };

  const eliminarPedido = (id) => {
    const actualizados = pedidos.filter((p) => p.id !== id);
    setPedidos(actualizados);
  };

  const editarPedido = (pedido) => {
    setForm(pedido);
    eliminarPedido(pedido.id); // elimina el antiguo para evitar duplicado
  };

  return (
    <div className="contenedor">
      <div className="contenido">
        <Card />

        <div className="columnaFormulario">
          <Formulario
            form={form}
            setForm={setForm}
            agregarPedido={agregarPedido}
          />

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
    </div>
  );
}

export default App;

