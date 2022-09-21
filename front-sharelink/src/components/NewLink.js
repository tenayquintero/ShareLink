import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import './NewLink.css';

const NewLink = () =>{

const [title, setTitle] = useState([]);
const [newTitle,setNewTitle]=useState('');
const [url,setUrl] = useState([]);
const [newUrl,setNewUrl] = useState('');
const [description, setDescription] = useState([]);
const [newDescription, setNewDescription] = useState('');

const user = useUser()

    const handleSubmit = e =>{
        e.preventDefault()
        setTitle([...title, newTitle])
        setNewTitle('')
        setUrl([...url, newUrl])
        setNewUrl('')
        setDescription([...description, newDescription])
        setNewDescription('')

    }
    if (!user) {
        return <Navigate to="/" />
    }
    return (
         <div className="todo">
              <form onSubmit={handleSubmit}>
            
            <input placeholder='title....' value={newTitle} onChange={e=>setNewTitle(e.target.value)} />
            <input placeholder='url.....' value={newUrl} onChange={e=>setNewUrl(e.target.value)} />
            <input placeholder='description.....' value={newDescription} onChange={e=>setNewDescription(e.target.value)} />
            <button>Compartir</button>
          
            </form>
           
                <ul>
            
                {title.map((entry, index) =>
                <li key={index} onClick={() => setTitle(title.filter((_, i) => i !== index))}>
                {entry}
               </li>
                )}
                {url.map((entry, index) =>
                    <li key={index} onClick={() => setUrl(url.filter((_, i) => i !== index))}>
                      {entry}
                    </li>
                    )}
                {description.map((entry, index) =>
                    <li key={index} onClick={() => setDescription(description.filter((_, i) => i !== index))}>
                      {entry}
                    </li>
                    )}
                 </ul>
           
                
     
       
        </div>
    )
}

export default NewLink;
