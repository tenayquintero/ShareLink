import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import OneMyLink from "../OneMyLink/OneMyLink";

const ListMyLinks = () => {

    const user = useUser()
    const [data, setData] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetch('http://127.0.0.1:3000/mylinks', {
                headers: user ? { 'Authorization': user.data } : {}
            })
            const resData = await res.json();
            setData(resData)

        })()
    }, [user])

    console.log(data)
    if (data?.message === 'error') {
        setError(true)

    }

    if (!user) {
        return <Navigate to='/' />
    }

    return (
        <>
            {
                error
                    ? <p>Ha surgido un error</p>
                    : <ul className="listLinks">
                        {(data?.result.length === 0) && <p>Aún no tienes enlaces compartidos</p>}
                     
                        {data?.result.map(item =>
                            <li>
                                <OneMyLink myLink={item} />
                            </li>
                        )}
                    </ul>
            }
           

        </>
    )
}
export default ListMyLinks;