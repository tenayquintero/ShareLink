import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import useFetch from 'fetch-suspense'
import './EditLink.css'

const EditLink = () => {
    const user = useUser()
    console.log('soy user', user)
    const { id } = useParams();
   

    const link = useFetch(`http://127.0.0.1:3000/links/${id}`)
    console.log('soy link de editUser', link)

    const [title, setTitle] = useState(link.data.title);
    const [url, setUrl] = useState(link.data.url);
    const [description, setDescription] = useState(link.data.description);
    const [result, setResult] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://127.0.0.1:3000/links/${id}`, {
            method: 'PUT',
            headers: user ? { 'Authorization': user.data, "Content-type": "application/json", } : {},
            body: JSON.stringify({ title, url, description })

        });
        const data = await res.json()
        setResult(data)
    }
    //Porque queda en bucle?
    // if(message?.status === 'OK'){
    //     setMessage('succes')
    // }else{
    //     setMessage('error')
    // }

    return (
        <div className="bg">
            <form onSubmit={handleSubmit} className='form_editLink'>
                <label>
                    <input
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='title...'
                    />
                </label>
                <label>
                    <input
                        name='url'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder='url...'
                    />
                </label>
                <label>
                    <textarea
                        name='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='description...'
                    />
                </label>
                <button>Guardar</button>
            </form>
            {result?.status === 'OK' &&
                <>
                <p className="resultConfirmation">¡Felicidades! tu link ha sido modificado</p>
                <Link to='/mylinks' ><button>volver</button></Link>
                </>
            }
            {result?.status === 'error' &&
                <p>Recuerda que todos los campos son obligatorios</p>
            }

        </div>
    )

}

export default EditLink;