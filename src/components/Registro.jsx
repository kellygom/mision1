import { useState } from "react";
import './Registro.css';

function Registro() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    contraseña: ''
  });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!usuario.nombre || !usuario.email || !usuario.contraseña) {
      alert("Por favor completa todos los campos");
      return;
    }

    // Mostrar alerta simulando el registro
    alert(`Usuario ${usuario.nombre} registrado exitosamente`);
    
    // Limpiar el formulario
    setUsuario({ nombre: '', email: '', contraseña: '' });
  };

  return (
    <form className="registro" onSubmit={handleSubmit}>
      <h2>Registro de Usuario</h2>
      <input
        name="nombre"
        placeholder="Nombre"
        value={usuario.nombre}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Correo"
        value={usuario.email}
        onChange={handleChange}
      />
      <input
        name="contraseña"
        type="password"
        placeholder="Contraseña"
        value={usuario.contraseña}
        onChange={handleChange}
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default Registro;
