// import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import './OneMyLink.css'

const OneMyLink = ({ myLink }) => {

    return (
        <section className='link'>
            <h2>{myLink.title}</h2>
            <a href={myLink.url} > <img src={myLink.image} alt={myLink.title} /></a>
            <p>{myLink.description}</p>
            <button>
                <Link to={`/mylinks/delete/${myLink.id_link}`} >
                    delete
                </Link>
            </button>
            <button>edit</button>
        </section>
    )
}

export default OneMyLink;