import { NavLink } from "react-router-dom";
import { useSetUser, useUser } from "../context/UserContext";

const Auth = () => {

    const user = useUser()
    const setUser = useSetUser()

    if (user) {
        return <ul>
            <li>
                {user.email}
            </li>
            <li onClick={() => setUser(null)}>
                X
            </li>
            <li>
               < NavLink to= "/links"Links >Links</NavLink>
               </li>


        </ul>
    } else {
        return (
            <nav>
                <div><NavLink to='/'>Home</NavLink></div>
                <div><NavLink to='/login'>Login</NavLink></div>
                <div><NavLink to='/signup'>SignUp</NavLink></div>
            </nav>
        )
    }

}

export default Auth;