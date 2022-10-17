import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./Submenu.css";

const Submenu = () => {
  const user = useUser();
  return (
    <menu className="submenuWeb">
      <h2>Configuración</h2>
      <ul>
        <li>
          <Link to={`/users/edit/${user?.id}`}> Editar perfil</Link>
        </li>
        <li>
          <Link to={`/users/${user?.id}/password`}>Cambiar contraseña</Link>
        </li>
        <li>
          <Link to={"/deleteuser"}>Eliminar cuenta</Link>
        </li>
      </ul>
    </menu>
  );
};

export default Submenu;
