import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import './NewLink.css';

const NewLink = ({ setResponse, response }) => {

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');

    const user = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`http://127.0.0.1:3000/links/`, {
            method: 'POST',
            headers: user ? {
                'Authorization': user.data,
                "Content-type": "application/json",
            } : {},
            body: JSON.stringify({ title, url, description })
        })
        const resData = await res.json();
        setResponse([...response, resData])
    }

    if (!user) {
        return <Navigate to="/" />
    }
    return (
        <div className="newLink">
            <p>No dejes de compartir tus enlaces aquí y ayudar
                a otras personas en su día a día </p>
            <form onSubmit={handleSubmit} className='form_newLink'>
                <input placeholder='title....' value={title} onChange={e => setTitle(e.target.value)} />
                <input placeholder='url.....' value={url} onChange={e => setUrl(e.target.value)} />
                <textarea placeholder='description.....' value={description} onChange={e => setDescription(e.target.value)} />
                <button>Compartir</button>

            </form>
            <ul>

            </ul>
        </div>
    )
}

export default NewLink;
