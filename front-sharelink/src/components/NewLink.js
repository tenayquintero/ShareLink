import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import './NewLink.css';

const NewLink = () =>{

const [title, setTitle] = useState('');
const [url,setUrl] = useState('');
const [description, setDescription] = useState('');
const [data,setData] = useState();


const user = useUser();

    const newLink = [...data, { title, url, description }]

    const handleSubmit = async e =>{
        e.preventDefault(newLink)
        const res = await fetch(`http://127.0.0.1:3000/links/`,{
            method:'POST',
            headers: user ? { 'Authorization': user.data } : {},
            body:{ title, url, description }
        })
        const resData = await res.json();
        setData(resData)
       

       

    }
    if (!user) {
        return <Navigate to="/" />
    }
    return (
         <div className="todo">
              <form onSubmit={handleSubmit}>
            
            <input placeholder='title....' value={title} onChange={e=>setTitle(e.target.value)} />
            <input placeholder='url.....' value={url} onChange={e=>setUrl(e.target.value)} />
            <input placeholder='description.....' value={description} onChange={e=>setDescription(e.target.value)} />
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
