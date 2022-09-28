import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import './Submenu.css'
const Submenu = () =>{
    const user = useUser();
    return(
        <menu className="submenuWeb">
            <h2>Tools</h2>
            <ul>
                <li>
                    <Link to={`/users/edit/${user?.id}`}> Editar perfil</Link> 
                </li>
                <li>
                    Cambiar contraseña
                </li>
            </ul>
        </menu>
    )

}

export default Submenu;