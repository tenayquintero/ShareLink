// POST - '/users/recoverPassword

import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";


const RecoverPass = () => {
    const user = useUser()
    

    const [email, setEmail] = useState("");
    
    const [result, setResult] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/users/recover_password', {
            method: 'PUT',
            headers: user ? { 'Authorization': user.data, "Content-type": "application/json", } : {},
            body: JSON.stringify({ email})

        });
        const data = await res.json();
        console.log('soy data de editPassword', data);
        setResult(data);
    }

    return (
        <div className="bg">
            <form onSubmit={handleSubmit} className=''>
                <label> <p>Introduce tu mail para recuperar el Password</p>
                    <input
                        email='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                </label>
                <button>Enviar</button>
            </form>

            {result?.status === 'OK' &&
                <p>Tu Password se ha cambiado correctamente</p>
               
            }
             <Link to={'/'} >Volver </Link>
            {result?.status === 'error' &&
                <p>Recuerda que todos los campos son obligatorios</p>
            }

        </div>
    )

}

export default RecoverPass;