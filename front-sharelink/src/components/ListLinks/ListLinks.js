import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
import OneLink from "../OneLink/OneLink";
import './ListLinks.css'

const ListLinks = ({ fetchKey }) => {

    const user = useUser()

    const links = useFetch('http://127.0.0.1:3000/links',fetchKey)
    
    if (!user) {
        return <Navigate to="/" />
    }

    return (
        <ul className="listLinks">
            {links?.data.map(link =>
                <li key={link.id_link}> <OneLink link={link} />
                 
                </li>
            )}
          

        </ul>
    )
}

export default ListLinks;