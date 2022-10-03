import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const useFetch = (url, key) => {
    
    const user = useUser()
    const [data, setData] = useState();
    // const [error, setError] = useState(false);

    useEffect(() => {
       
        const callApi = async () => {
                const res = await fetch(url,
                    {
                        headers: user ? { 'Authorization': user.data } : {}
                    })

                const resData = await res.json();
                if (!res.ok) {
                 
                   throw Error(resData.message)
                    
                }

                    setData(resData);
                
        }
        callApi();
    }, [url, user, key]);

    //  return [data,error]
      return data

}


export default useFetch;