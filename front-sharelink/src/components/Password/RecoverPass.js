import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const RecoverPass = () => {
  const [email, setEmail] = useState();
  const [result, setResult] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND}/users/recover_password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    console.log(res);
    const data = await res.json();
    console.log("soy data de editPassword", data);
    setResult(data);
    console.log(email);
  };

  return (
    <div className="bg">
      <form onSubmit={handleSubmit}>
        <label>
          <p>Introduce tu mail para recuperar el Password</p>
          <input
            name="name"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button>Enviar</button>
      </form>
      {result?.status === "Ok" && <Navigate to="recover_newpassword" />}
      <Link to={"/"}>Volver </Link>
      {result?.status === "error" && (
        <p>Recuerda que todos los campos son obligatorios</p>
      )}
    </div>
  );
};

export default RecoverPass;
