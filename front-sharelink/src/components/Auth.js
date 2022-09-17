import { NavLink } from "react-router-dom";
import { useSetUser, useUser } from "../context/UserContext";

const Auth = () =>{

    const user = useUser()
    const setUser = useSetUser()
    
    if(user){
        return <div>
            <span>
                {user.email}
            </span>
            <span onClick={()=>setUser(null)}>
                X 
            </span>
            </div>
    }else{
        return(
            <nav>
                <div><NavLink to='/'>Home</NavLink></div>
                <div><NavLink to='/login'>Login</NavLink></div>
               
                <div><NavLink to='/signup'>SignUp</NavLink></div>
            </nav>
        )
    }
    
}

export default Auth;