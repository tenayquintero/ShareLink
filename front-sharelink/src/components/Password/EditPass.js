// PUT - '/users/:id/password'

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import useFetch from 'fetch-suspense'


const EditPass = () => {
    const user = useUser()
    const { id } = useParams();

    const link = useFetch(`http://127.0.0.1:3000/users/${id}/password`)
    

    const [pass, setPass] = useState();
   
    const [result, setResult] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://127.0.0.1:3000/users/${id}/password`, {
            method: 'PUT',
            headers: user ? { 'Authorization': user.data, "Content-type": "application/json", } : {},
            body: JSON.stringify({ })

        });
        const data = await res.json()
        setResult(data)
    }
   
    return (
        <div className="bg">
            <form onSubmit={handleSubmit} className='form_editLink'>
                
                 
            </form>
            {result?.status === 'OK' &&
                <>
               
                </>
            }
            {result?.status === 'error' &&
                <p>Recuerda que todos los campos son obligatorios</p>
            }

        </div>
    )

}

export default EditPass;