import { useState } from "react";
import { Navigate, useParams } from "react-router-dom"
import { useUser } from "../../context/UserContext";


// function NewVotes({ value }) {



function NewVotes() {
  const user = useUser();


 
 


    const {id} =useParams();
   

    const [vote, setVote]= useState()
    const [response, setResponse] = useState();
    const handleClick = async (e) => {
      e.preventDefault();

      const res = await fetch(`http://127.0.0.1:3000/links/${id}/votes`, {
          method: 'POST',
          headers: user ? {
              'Authorization': user.data,
              "Content-type": "application/json",
          } : {},
          body: JSON.stringify({ vote })
      })
      const resData = await res.json();
      console.log(resData,'soy resdata')
      setResponse(resData)
    
  }

  

    
    if (!user) {
        return <Navigate to="/" />
    }
    return (
      <div className="votes" onClick={handleClick}>
        <span onClick={()=>setVote(1)}> {vote >= 1 ? '★' : '☆'}</span>
        <span onClick={()=>setVote(2)}> {vote >= 2 ? '★' : '☆'}</span>
        <span onClick={()=>setVote(3)}>{vote >= 3 ? '★' : '☆'}</span>
        <span onClick={()=>setVote(4)}>{vote >= 4 ? '★' : '☆'}</span>
        <span onClick={()=>setVote(5)}>{vote >= 5 ? '★' : '☆'}</span>   
    
       {response?.status === 'ok' &&
       <p>Gracias por tu Voto</p>}
      </div>
    )

  //}
  // return (
  //   <div className="votes">
  //     {value >= 1 ? '★' : '☆'}
  //     {value >= 2 ? '★' : '☆'}
  //     {value >= 3 ? '★' : '☆'}
  //     {value >= 4 ? '★' : '☆'}
  //     {value >= 5 ? '★' : '☆'}
  //   </div>
  // )
}

export default NewVotes