import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSetUser, useUser } from "../../context/UserContext";
import "./LoginPage.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState();

  const user = useUser();
  const setUser = useSetUser();

  const handle = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:3000/users/login", {
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
    } else {
      setUser(resData);
    }
  };
  if (user) {
    return <Navigate to="/links" />;
  }

  return (
    <section className="bg">
      <h2>
        <Link to="/">X</Link>
      </h2>

      <form onSubmit={handle} className="login">
        <h2>Acceso</h2>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="contraseña"
          />
        </label>
        <button>¡Vamos!</button>
        <Link to={`/users/recover_password`}>Recuperar Contraseña</Link>
        {status === "error" && (
          <p className="error">
            "¡Ups! el email o la contraseña no son correctos"
          </p>
        )}
      </form>
    </section>
  );
};
export default Login;
