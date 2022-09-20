import { useState } from "react";

const NewLink = () =>{

const [title, setTitle] = useState();
const [url,setUrl] = useState();

    const handle = (e) =>{
        e.preventDefault();

    }
    return (
        <form onSubmit={handle}>

        </form>
    )
}

export default NewLink;
