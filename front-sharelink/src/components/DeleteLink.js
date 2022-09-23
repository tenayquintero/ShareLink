import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext"
import './DeleteLink.css'
const DeleteLink = () => {
    const user = useUser();
    const { id } = useParams();

    const [result, setResult] = useState();

    const deleteLink = async () => {
        const res = await fetch(`http://127.0.0.1:3000/links/${id}`, {
            method: 'DELETE',
            headers: user ? { 'Authorization': user.data } : {},

        })
        const resData = await res.json();
        console.log(resData);
        setResult(resData);

    }

    return (
        <section className="deleteLink">
            {!result &&
                <>
                    <p>¿desea borrar su publicacion</p>
                    <button onClick={() => deleteLink()}>si</button>
                    <Link to='/mylinks' > <button>No</button></Link>
                </>

            }

            {result?.status === 'ok' &&
                <>
                    <p>Tu publicación se ha borrado correctamente</p>
                    <Link to='/mylinks' >volver</Link>
                </>
            }

        </section>
    )
}

export default DeleteLink;