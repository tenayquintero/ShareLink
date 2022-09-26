import { Navigate } from "react-router-dom"
import { useUser } from "../../context/UserContext";

function NewVotes({ value }) {

  const user = useUser();

  if (!user) {
    return <Navigate to="/" />
  }
  return (
    <div className="votes">
      {value >= 1 ? '★' : '☆'}
      {value >= 2 ? '★' : '☆'}
      {value >= 3 ? '★' : '☆'}
      {value >= 4 ? '★' : '☆'}
      {value >= 5 ? '★' : '☆'}
    </div>
  )
}

export default NewVotes