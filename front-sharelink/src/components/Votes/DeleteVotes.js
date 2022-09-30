import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext"

const DeleteVotes = () => {
    const user = useUser();
    const { id } = useParams();

    const [result, setResult] = useState();

    const deletevotes = async () => {
        const res = await fetch(`http://127.0.0.1:3000/links/${id}/votes`, {
            method: 'DELETE',
            headers: user ? { 'Authorization': user.data } : {},

        })
        const resData = await res.json();
        console.log(resData);
        setResult(resData);
    }
    return (
        <section className="bg">
            {!result &&
                <section className="deleteVotes_confirmation">
                    <p>¿Quieres borrar tu voto?</p>
                    <div>
                        <button onClick={() => deletevotes()}>si</button>
                        <Link to='/mylinks'> <button>No</button></Link>
                    </div>
                </section>
            }
            {result?.status === 'ok' &&
                <>
                    <p className="resultConfirmation">Tu voto se ha borrado correctamente</p>
                <Link to='/mylinks' ><button>volver</button></Link>
                </>
            }
        </section>
    )
}

export default DeleteVotes;