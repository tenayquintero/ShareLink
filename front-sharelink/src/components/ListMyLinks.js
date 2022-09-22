import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import OneMyLink from "./OneMyLink";

const ListMyLinks = () => {

    const user = useUser()
    const [data, setData] = useState();
    const [error, setError] = useState()

    useEffect(() => {
        (async () => {
            const res = await fetch('http://127.0.0.1:3000/mylinks', {
                headers: user ? { 'Authorization': user.data } : {}
            })
            const resData = await res.json();
            console.log(resData)
            console.log(user)
            setData(resData)

        })()
    }, [user])
    console.log(data)
    if (data?.message === 'error') {
        setError('error')

    }
    if(!user){
        return <Navigate to  ='/' />
    }

    return (
        <>
            {
                error === 'error' ? <p>Ha surgido un error</p>
                    : <ul>
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