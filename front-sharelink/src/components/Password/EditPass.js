import { useState } from "react";
import { useSetUser, useUser } from "../../context/UserContext";
import MessageStatus from "../MessageStatus/MessageStatus";
import { useEditPass } from "../api";

const EditPass = () => {
  const user = useUser();
  const setUser = useSetUser;
  const id = user.id;

  const [newPassword, setNewPass] = useState("");
  const [oldPassword, setOldpassword] = useState("");
  const [, response, sendData] = useEditPass(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendData({ oldPassword, newPassword }, "PUT");
  };
  if (response?.status === "OK") {
    setUser(null);
  }

  return (
    <form onSubmit={handleSubmit} className="editPass">
      <h3>Editar contraseña</h3>
      <label>
        <input
          type="password"
          value={oldPassword}
          placeholder="Introduce tu contraseña actual"
          onChange={(e) => setOldpassword(e.target.value)}
        />

        <input
          type="password"
          value={newPassword}
          placeholder="Introduce tu nueva contraseña"
          onChange={(e) => setNewPass(e.target.value)}
        />
      </label>
      <button>Guardar</button>
      {response?.status === "OK" && (
        <MessageStatus
          message="Tu Password se ha cambiado correctamente,debes volver a logearte"
          title="¡Felicidades!"
          navigate="/login"
        />
      )}

      {response?.code === 404 && <p className="error">Contraseña incorrecta</p>}
      {response?.code === 400 && (
        <p className="error">
          Recuerda que todos los campos son obligatorios y tu nueva contraseña
          ha de tener entre 6 y 20 caracteres sin espacios.
        </p>
      )}
    </form>
  );
};

export default EditPass;
