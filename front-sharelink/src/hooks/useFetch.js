import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const useFetch = ( url) =>{
    const user = useUser()

    const [data, setData] = useState();
    useEffect(()=>{
        (async()=>{
            const res = await fetch(url,
                {
                    headers: user ? { 'Authorization': user.data } : {}
                })
          
            const resData = await res.json();
            setData(resData);
        })()
    },[url,user])

    return data
    
}
// useEffect(() => {
//     (async () => {
//         const res = await fetch('http://127.0.0.1:3000/links', {
//             headers: user ? { 'Authorization': user.token } : {}
//         })
//         const resData = await res.json();
//         setData(resData)
//         console.log('resData ', resData)

//     })()
// }, [user])

export default useFetch;