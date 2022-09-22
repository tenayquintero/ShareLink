import { useState } from "react";
import {  useParams } from "react-router-dom";
import { useUser } from "../context/UserContext"
const DeleteLink = () => {
    const user = useUser();
    const { id } = useParams();

    const [result, setResult] = useState();

    // const link = useFetch(`http://127.0.0.1:3000/links/${id}`)

const deleteLink = async()=>{
    const res = await fetch(`http://127.0.0.1:3000/links/${id}`, {
        method: 'DELETE',
        headers: user ? { 'Authorization': user.data } : {},


    })
    const resData = await res.json();
    console.log(resData);
    setResult(resData);
   

}


return(
    <section>
     <p>¿desea borrar su publicacion</p>
     <button onClick={()=>deleteLink()}>si</button>
     {result?.status === 'ok' &&
     <p>Tu publicación se ha borrado correctamente</p>
     }
    
    </section>
)
}

export default DeleteLink;