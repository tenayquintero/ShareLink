import { NavLink } from "react-router-dom";
import { useSetUser, useUser } from "../../context/UserContext";
import iconOff from "../../img/iconOffpng.png"
import './Auth.css'

const Auth = () => {

    const user = useUser()
    const setUser = useSetUser()

    if (user) {
        return <nav>
            <section className="nav_section">
                <h1>ShareLink</h1>

            </section>

            <ul>
                <li>
                    < NavLink to="/links" >Links</NavLink>
                </li>
                <li>  < NavLink to="/mylinks" >My Links</NavLink>
                </li>
                <li>  < NavLink to="/links/:id" >New Link</NavLink>
                </li>
                


            </ul>
            <section className="logeado">
                <div>
                    {user.email}
                </div>

                <div
                    onClick={() => setUser(null)}
                    style={{ backgroundImage: `url(${iconOff})` }}
                    className='iconOff'
                >
                    X
                </div>
            </section>
        </nav>
    } else {
        return (
            <nav>
                <h1>ShareLink</h1>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/login'>Login</NavLink></li>
                    <li><NavLink to='/signup'>Sign Up</NavLink></li>
                </ul>

            </nav>
        )
    }

}

export default Auth;