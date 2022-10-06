import { useState } from "react";
import MessageStatus from "../MessageStatus/MessageStatus";

const RecoverNewPass = () => {
  const [recover_code, setRecover_code] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [response, setResponse] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND}/users/reset_password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recover_code, newPassword }),
      }
    );
    const resData = await res.json();
    setResponse(resData);
  };
  return (
    <div className="bg">
      <p>Se te ha enviado un código a tu correo</p>
      <form onSubmit={handleSubmit} className="fg">
        <p>Pega aquí tu código</p>
        <input
          value={recover_code}
          onChange={(e) => setRecover_code(e.target.value)}
        />
        <p>Nueva Contraseña</p>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button>Recuperar</button>
        {response?.status === "OK" && (
          <MessageStatus
            titel="¡Felicidaes!"
            message="Tu contraseña ha sido actualizada
        correctamente, ya te puedes logear"
            navigate="/login"
          />
        )}
      </form>
    </div>
  );
};

export default RecoverNewPass;
