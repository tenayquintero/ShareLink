import { NavLink } from "react-router-dom";
import { useSetUser, useUser } from "../../context/UserContext";
import iconOff from "../../img/iconOffpng.png";
import avatarDefault from "../../img/avatarDefault.png";

import "./Auth.css";
// import useFetch from "../../hooks/useFetch";

const Auth = () => {
  const user = useUser();
  const setUser = useSetUser();

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
            <NavLink to="/mylinks">My Links</NavLink>
          </li>
          <li>
            <NavLink to="/links/:id">New Link</NavLink>
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
            <p>{user?.email}</p>
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
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Auth;
