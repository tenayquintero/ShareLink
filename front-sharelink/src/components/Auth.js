import { NavLink } from "react-router-dom";
import { useSetUser, useUser } from "../context/UserContext";
import iconOff from "../img/iconOffpng.png"
import './Auth.css'

const Auth = () => {

    const user = useUser()
    const setUser = useSetUser()

    if (user) {
        return <nav>
            <section className="nav_section">
                <h1>ShareLink</h1>
                <div>
                    {user.email}
                </div>
            </section>
           
            <ul>
                <li>
                    < NavLink to="/links" >Links</NavLink>
                </li>
                <li>  < NavLink to="/mylinks" >My Links</NavLink>
                </li>
                <li>  < NavLink to="/links/:id" >New Link</NavLink>
                </li>

                <li
                    onClick={() => setUser(null)}
                    style={{ backgroundImage: `url(${iconOff})` }}
                    className='iconOff'
                >
                    X
                </li>

            </ul>
        </nav>
    } else {
        return (
            <nav>
                <h1>ShareLink</h1>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/login'>Login</NavLink></li>
                    <li><NavLink to='/signup'>SignUp</NavLink></li>
                </ul>
             
            </nav>
        )
    }

}

export default Auth;