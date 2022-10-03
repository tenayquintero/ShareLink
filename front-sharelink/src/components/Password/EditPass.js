import { useState } from "react";
import { useUser } from "../../context/UserContext";


const EditPass = () => {
    const user = useUser()
    const id = user.id;

    const [newPassword, setNewPass] = useState("");
    const [oldPassword, setOldpassword] = useState("")
    const [result, setResult] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://127.0.0.1:3000/users/${id}/password`, {
            method: 'PUT',
            headers: user ? { 'Authorization': user.data, "Content-type": "application/json", } : {},
            body: JSON.stringify({ oldPassword, newPassword })

        });
        const data = await res.json();
        console.log('soy data de editPassword', data);
        setResult(data);
    }

    return (
        <div className="bg">
            <form onSubmit={handleSubmit} className=''>
                <label> <p>Password Actual</p>
                    <input
                        password='password'
                        value={oldPassword}
                        onChange={(e) => setOldpassword(e.target.value)}
                    />
                    <p>Nuevo Password</p>
                    <input
                        password='password'
                        value={newPassword}
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