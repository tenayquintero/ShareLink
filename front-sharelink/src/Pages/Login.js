import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSetUser, useUser } from "../context/UserContext";

const Login = () =>{

    const [email,setEmail] = useState('');
    const [password,setPassword] =useState('');
    const [status, setStatus] = useState()
    const [error, setError] = useState()
    
    const user = useUser()
    const setUser = useSetUser()

    const handle= async (e)=>{
        e.preventDefault()
        const res = await fetch('http://127.0.0.1:3000/users/login', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                email,
                password
            })
           
        })
        const resData= await res.json()
        console.log(resData)
        if(resData.status === 'error'){
            setStatus('error')
            setError(resData.message)
        }else{
            setUser(resData)
        }
       
    }
    if(user){
        return <Navigate to='/links' />
    }
    return(
        <section>
            <h2>Login</h2>  
            <form onSubmit={handle}>
                <label>
                    <input 
                    name='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    type='email'
                    />
                </label>
                <label>
                    <input
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                    />
                </label>
                <button>entrar</button>
            </form>
            {status === 'error' && <p>{error}</p>}
        </section>
    )
}
export default Login