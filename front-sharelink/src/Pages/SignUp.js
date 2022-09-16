import { useState } from "react";

const SignUp = () => {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

     const handle = (e) =>{
        e.preventDefault();

        
     }

    return (
        <section>
            <h2>SignUp</h2>
            <form onSubmit={handle}>
                <label name='email'>
                    <input 
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    type='email'
                    />
                </label>
                <label name='password'>
                    <input
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                    />
                </label>
                <button>Registrarse</button>
            </form>
        </section>
    )
}
export default SignUp;