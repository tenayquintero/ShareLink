import { useState } from "react";

const Login = () =>{

    const [email,setEmail] = useState('');
    const [password,setPassword] =useState('');

    const handle=(e)=>{
        e.preventDefault();
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
        </section>
    )
}
export default Login;