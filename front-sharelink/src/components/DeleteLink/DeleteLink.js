import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext"
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
        setResult(resData);
    }
    return (
        <section className="bg">
            {!result &&
                <section className="deleteLink_confirmation">
                    <p>¿Quieres borrar tu publicación?</p>
                    <div>
                        <button onClick={() => deleteLink()}>si</button>
                        <Link to='/mylinks'> <button>No</button></Link>
                    </div>
                </section>
            }
            {result?.status === 'ok' &&
                <>
                    <p className="resultConfirmation">Tu publicación se ha borrado correctamente</p>
                <Link to='/mylinks' ><button>volver</button></Link>
                </>
            }
        </section>
    )
}

export default DeleteLink;