import "./Modal.css";
import Formulario from "./Formulario";

function Modal({ visible, onClose, form, setForm, onPagoContraentrega }) {
  if (!visible) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <button className="cerrar" onClick={onClose}>✖</button>

        <Formulario
          form={form}
          setForm={setForm}
          onPagoContraentrega={onPagoContraentrega}
          mostrarEnModal={true}
        />
      </div>
    </div>
  );
}


export default Modal;


