import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSetUser, useUser } from "../context/UserContext";
import backgroundLink from '../images/linkBackground.jpg'

import './Login.css'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState()
    const [error, setError] = useState()

    const user = useUser()
    const setUser = useSetUser()

    const handle = async (e) => {
        e.preventDefault()
        const res = await fetch('http://127.0.0.1:3000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })

        })
        const resData = await res.json()
        console.log(resData)
        if (resData.status === 'error') {
            setStatus('error')
            setError(resData.message)
        } else {
            setUser(resData)
        }

    }
    if (user) {
        return <Navigate to='/links' />
    }


    return (

        <section className='pages-auth' >
            <h2><Link to='/'>X</Link></h2>
            <form onSubmit={handle} style={{ backgroundImage: `url(${backgroundLink})` }}>
                <h2>Login</h2>
                <label >
                    <input
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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