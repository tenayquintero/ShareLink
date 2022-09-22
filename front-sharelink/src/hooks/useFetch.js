import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const useFetch = ( {url} ) =>{
    const user = useUser()

    const [data, setData] = useState();
    useEffect(()=>{
        (async()=>{
            const res = await fetch(url,{
              headers:  user ? { 'Authorization': user.data } : {}
            })
            const resData = await res.jsson();
            setData(resData);
        })()
    },[url,user])

    return data
    
}

export default useFetch;