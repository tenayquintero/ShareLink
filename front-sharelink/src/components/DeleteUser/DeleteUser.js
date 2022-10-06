import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useDeleteUser } from "../api";
import MessageStatus from "../MessageStatus/MessageStatus";

const DeleteUser = () => {
  const user = useUser();
  const [password, setPassword] = useState("");
  const [, response, sendData] = useDeleteUser(user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendData({ password }, "DELETE");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>hola</h1>
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button>Eliminar</button>
      {response?.status === "error" && <p>La contraseña no es correcta</p>}
      {response?.status === "ok" && (
        <MessageStatus
          title="¡Vaya!"
          message="Has eliminado tu cuenta
      espero vuelvas pronto"
          navigate="/"
        />
      )}
    </form>
  );
};

export default DeleteUser;
