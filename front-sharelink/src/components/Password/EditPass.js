// PUT - '/users/:id/password'

import { useState } from "react";
//import { useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
//import useFetch from 'fetch-suspense'


const EditPass = () => {
    const user = useUser()
    //const { id } = useParams();
    const id = user.id;
    console.log(id);
   // const newPass = useFetch(`http://127.0.0.1:3000/users/${id}/password`,{
     //   headers: user ? {'Authorization': user.data} :{}
       
    //})
 
    
   const [newpass, setNewPass] = useState("");
   const [oldpass,setOldpass]=useState("")
    const [result, setResult] = useState();
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://127.0.0.1:3000/users/${id}/password`, {
            method: 'PUT',
            headers: user ? { 'Authorization': user.data, "Content-type": "application/json", } : {},
            body: JSON.stringify({oldpass, newpass})

        });
        const data = await res.json();
        console.log(data);
        setResult(data);
    }
   
    return (
        <div className="bg">
            <form onSubmit={handleSubmit} className=''>
            <label> <p>Password Actual</p>
                    <input
                        password='password'
                        value={oldpass}
                        onChange={(e) => setOldpass(e.target.value)}
                    />
                    <p>Nuevo Password</p>
                    <input
                        password='password'
                        value={newpass}
                        onChange={(e) => setNewPass(e.target.value)}
                    />
                </label>
                <button>Guardar</button>
            </form>
           
            {result?.status === 'OK' &&
                <p>Tu Password se ha cambiado correctamente</p>
            }
            {result?.status === 'error' &&
                <p>Recuerda que todos los campos son obligatorios</p>
            }

        </div>
    )

}

export default EditPass;