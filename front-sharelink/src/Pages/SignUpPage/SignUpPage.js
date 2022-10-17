import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpPage.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState();
  const [code, setCode] = useState();

  const handle = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const resData = await res.json();
    console.log(resData);

    if (resData.status === "error") {
      setStatus("error");
      setCode(resData.code);
    } else {
      setStatus("ok");
      setCode("");
    }
  };

  return (
    <section className="bg">
      <h2>
        <Link to="/">X</Link>
      </h2>
      <form onSubmit={handle}>
        <h2>Registro</h2>
        <label htmlFor="name">
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
          />
        </label>
        <label name="password" htmlFor="password">
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="contraseña"
          />
        </label>
        <button>¡Vamos!</button>
        {code === 400 && (
          <p className="error">
            Recuerda crear una contraseña entre 6-20 caracteres sin espacios
          </p>
        )}
        {code === 409 && <p className="error">Este email ya existe</p>}
        {status === "ok" && (
          <p className="resultConfirmation">
            Por favor revisa tu bandeja de email para confirmarl tu email.
          </p>
        )}
      </form>
    </section>
  );
};
export default SignUp;
