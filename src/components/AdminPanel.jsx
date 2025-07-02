import { useEffect, useState } from 'react';

function AdminPanel() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch("https://landing-backend-1-v2eh.onrender.com/api/pedidos")
      .then((res) => res.json())
      .then((data) => setPedidos(data))
      .catch((err) => console.error("Error al cargar pedidos", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 Lista de Pedidos</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Barrio</th>
            <th>Ciudad</th>
            <th>Departamento</th>
            <th>Modelo</th>
            <th>Color</th>
            <th>Talla</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.nombre}</td>
              <td>{pedido.cedula}</td>
              <td>{pedido.telefono}</td>
              <td>{pedido.direccion}</td>
              <td>{pedido.barrio}</td>
              <td>{pedido.ciudad}</td>
              <td>{pedido.departamento}</td>
              <td>{pedido.modelo}</td>
              <td>{pedido.color}</td>
              <td>{pedido.talla}</td>
              <td>{pedido.cantidad}</td>
              <td>${pedido.precio.toLocaleString("es-CO")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
