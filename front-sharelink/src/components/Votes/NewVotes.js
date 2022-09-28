import { useState } from "react";
import { Navigate } from "react-router-dom"
import { useUser } from "../../context/UserContext";


// function NewVotes({ value }) {



const NewVotes = ({ id })=> {
  const user = useUser();
  // const {id} =useParams();
   

    const [vote, setVote]= useState()
    const [response, setResponse] = useState();
    const handleClick = async () => {
      // e.preventDefault();

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
  const onclick1 = () =>{
    setVote(1)
    handleClick()
  }
  const onclick2 = () => {
    setVote(2)
    handleClick()
  }
  const onclick3 = () => {
    setVote(2)
    handleClick()
  }
  const onclick4 = () => {
    setVote(2)
    handleClick()
  }
  const onclick5 = () => {
    setVote(2)
    handleClick()
  }

    if (!user) {
        return <Navigate to="/" />
    }
    return (
      <div className="votes">
        <span onClick={onclick1}>{vote >= 1 ? '★' : '☆'}</span>
        <span onClick={onclick2}>{vote >= 2 ? '★' : '☆'}</span>
        <span onClick={onclick3}>{vote >= 3 ? '★' : '☆'}</span>
        <span onClick={onclick4}>{vote >= 4 ? '★' : '☆'}</span>
        <span onClick={onclick5}>{vote >= 5 ? '★' : '☆'}</span>   
    
       {response?.status === 'ok' &&
       <p>Gracias por tu Voto</p>}
        {response?.status === 'error' &&
          <p>{response?.message}</p>}
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