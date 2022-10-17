import { Link, NavLink } from "react-router-dom";
import { useSetUser, useUser } from "../../context/UserContext";
import iconOff from "../../img/iconOffpng.png";
import avatarDefault from "../../img/avatarDefault.png";
import "./Auth.css";

const Auth = () => {
  const user = useUser();
  const setUser = useSetUser();

  console.log(user);

  if (user) {
    return (
      <nav className="nav_user">
        <section className="nav_section">
          <h1>ShareLink</h1>
        </section>
        <ul>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li>
            <NavLink to="/mylinks">Mis Links</NavLink>
          </li>
        </ul>
        <section className="logeado">
          <div>
            {user?.avatar === null ? (
              <img src={avatarDefault} alt="profile" className="photoProfile" />
            ) : (
              <img
                src={`${process.env.REACT_APP_BACKEND}/${user?.avatar}`}
                alt="profile"
                className="photoProfile"
              />
            )}
            <Link to={`/users/${user.id}`}>
              <p>{user?.email}</p>
            </Link>
          </div>

          <div
            onClick={() => setUser(null)}
            style={{ backgroundImage: `url(${iconOff})` }}
            className="iconOff"
          >
            X
          </div>
        </section>
      </nav>
    );
  } else {
    return (
      <nav>
        <h1>ShareLink</h1>
        <ul>
          <li>
            <NavLink to="/">Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/login">Acceso</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Registro</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Auth;
