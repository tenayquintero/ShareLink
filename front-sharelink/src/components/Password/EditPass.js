import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";
import MessageStatus from "../MessageStatus/MessageStatus";
import { useEditPass } from "../api";

const EditPass = () => {
  const user = useUser();
  const id = user.id;

  const [newPassword, setNewPass] = useState("");
  const [oldPassword, setOldpassword] = useState("");

  const [, response, sendData] = useEditPass(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendData({ oldPassword, newPassword }, "PUT");
  };

  return (
    <div className="bg">
      <form onSubmit={handleSubmit} className="">
        <label>
          {" "}
          <p>Password Actual</p>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldpassword(e.target.value)}
          />
          <p>Nuevo Password</p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </label>
        <button>Guardar</button>
      </form>

      {response?.status === "OK" && (
        <MessageStatus
          message="Tu Password se ha cambiado correctamente,debes volver a logearte"
          title="¡Felicidades!"
          navigate="/links"
        />
      )}
      <Link to={"/"}>Volver </Link>
      {response?.status === "error" && (
        <p>Recuerda que todos los campos son obligatorios</p>
      )}
    </div>
  );
};

export default EditPass;
