
import useFetch from 'fetch-suspense'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useUser } from '../../context/UserContext'


const EditVotes = () =>{

    const user = useUser()
    const { id } = useParams();
    const votesInfo = useFetch(`http://127.0.0.1:3000/links/${id}/votes`,{
        headers: user ? {'Authorization': user.data} :{}
    })
   
    const [votes, setVotes] = useState(votesInfo.data.votes);
    
    const [response,setResponse] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('votes', votes);
       

        const res = await fetch(`http://127.0.0.1:3000/links/${id}/votes`, {
            method: 'PUT',
            headers: user ? { 'Authorization': user.data} : {},
            body: formData

        });
        const data = await res.json()
        setResponse(data)
    }
    

    return(
        <div className="bg">
            <form onSubmit={handleSubmit} className='form_editVotes'>
                <label>
                
                    <input
                        votes='votes'
                        value={votes}
                        onChange={(e) => setVotes(e.target.value)}
                    />
                </label>
               
                <button>Guardar</button>
                {response?.status === 'error' &&
                    <p className='error'>{response?.message}</p>
                }
                {response?.status === 'OK' &&
                <>
                <p>¡Felicidades! Se ha actualizado tu voto correctamente</p>
                    <Link to='/links'><button>Volver</button></Link>  
                </>
                }
            </form>
            </div>
    )

}

export default EditVotes;