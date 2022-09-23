import { useState } from "react";
import { Link } from "react-router-dom";
import './SignUp.css'

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState()
    const [message, setMessage] = useState()

    const handle = async (e) => {
        e.preventDefault()
        const res = await fetch('http://127.0.0.1:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        })
        const resData = await res.json()

        if (resData.status === 'error') {
            setStatus('error')
            setMessage(resData.message)
        } else {
            setStatus('ok')
            setMessage(resData.message)
            console.log(resData)
        }




    }

    return (
        <section className='pages-auth'>
            <h2><Link to='/'>X</Link></h2>
            <form onSubmit={handle}>
                <h2>SignUp</h2>
                <label name='email'>
                    <input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button>Let's go</button>
            </form>
           
            <p className={status === 'error' && 'error'}>{message}</p>

        </section>
    )
}
export default SignUp;