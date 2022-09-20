import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
const ValidateEmail = () =>{

    const { registration_code } = useParams();
    const [message,setMessage] = useState();
    
useEffect(()=>{
    (async ()=>{
        const res = await fetch(`http://127.0.0.1:3000/users/validate/${registration_code}`,{
            // method:'POST',
            headers: {'Content-Type' : 'application/json'}
            // body: JSON.stringify(registration_code)
        });

        const resData = await res.json();
        console.log(resData)
        if (resData.status === 'error'){
            setMessage('error')
        }else{
            setMessage('succes')
        }
    })()
}, [registration_code])

return(
 
    <section>
    {message === 'error' &&
      <p>Tú código no es válido :(</p>}

     {message === 'ok' &&
     <p>Genial estás validado. Ya te puedes logear</p>
     
    }
           
    </section>

 
)

}
export default ValidateEmail;