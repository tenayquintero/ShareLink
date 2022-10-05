import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext"
import MessageStatus from "../MessageStatus/MessageStatus";
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
        <div className="bg">
        <section className="fg">
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
                    <MessageStatus message='Tu publicación se ha borrado correctamente' navigate='/mylinks'/>
                </>
            }
        </section>
        </div>
    )
}

export default DeleteLink;