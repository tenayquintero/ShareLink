import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useDeleteUser } from "../api";
import MessageStatus from "../MessageStatus/MessageStatus";
import "./DeleteUser.css";

const DeleteUser = () => {
  const user = useUser();
  const [password, setPassword] = useState("");
  const [, response, sendData] = useDeleteUser(user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendData({ password }, "DELETE");
  };

  return (
    <form onSubmit={handleSubmit} className="formDeleteUser">
      <h3>Eliminar cuenta</h3>
      <p>Por favor introduce tu contraseña</p>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="contraseña"
        type="password"
      />
      <button>Eliminar</button>
      {response?.status === "error" && (
        <p className="error">La contraseña no es correcta</p>
      )}
      {response?.status === "ok" && (
        <MessageStatus
          title="¡Vaya!"
          message="Has eliminado tu cuenta
      espero vuelvas pronto"
          navigate="/"
        />
      )}
      {response?.status === "ok" && user === null}
    </form>
  );
};

export default DeleteUser;
