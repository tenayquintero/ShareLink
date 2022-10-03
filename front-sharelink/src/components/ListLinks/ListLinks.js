import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useGetLinks } from "../api";
import OneLink from "../OneLink/OneLink";
import './ListLinks.css'

const ListLinks = ({ reload, result, fetchKey }) => {
    console.log('soy result',result)
    const user = useUser();

    const links = useGetLinks(fetchKey)

    if (!user) {
        return <Navigate to="/" />
    }

    return (
        <ul className="listLinks">
            {
                result?.data === undefined 
                && links?.data.map(link =>
                    <li
                        key={link.id_link}>
                        <OneLink link={link} reload={reload} />
                    </li>
                )}
            {
                result?.data.map(link =>
                    <li
                        key={link.id_link}>
                        <OneLink link={link} reload={reload} />
                    </li>
                )}
        </ul>
    )
}

export default ListLinks;