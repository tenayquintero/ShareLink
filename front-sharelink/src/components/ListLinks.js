import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import OneLink from "./OneLink";
import './ListLinks.css'

const ListLinks = () => {

    const user = useUser()

    const [data, setData] = useState();

    useEffect(() => {
        (async () => {
            const res = await fetch('http://127.0.0.1:3000/links', {
                headers: user ? { 'Authorization': user.token } : {}
            })
            const resData = await res.json();
            setData(resData)
            console.log('resData ', resData)

        })()
    }, [user])

    if (!user) {
        return <Navigate to="/" />
    }

    return (
        <ul className="listLinks">
            {data?.data.map(link =>
                <li key={link.id_link}> <OneLink link={link} /></li>
            )}

        </ul>
    )
}

export default ListLinks;