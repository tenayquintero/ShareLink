import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const ListMyLinks = () =>{

    const user = useUser()
    const [data, setData] = useState();

    useEffect(()=>{
        (async ()=>{
            const res = await fetch('http://127.0.0.1:3000/mylinks',{
            headers: user ? {'Authorization' : user.data} : {}
           })
           const resData = await res.json();
           console.log(resData)
           console.log(user)
           setData(resData)
          
        })()
    },[user])
    console.log(data)
    return(
        <ul>
            <li></li>
        </ul>
    )
}
export default ListMyLinks;