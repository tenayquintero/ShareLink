// import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

const OneMyLink = ({ myLink }) => {
 




    return (
        <section>

            <h2>{myLink.title}</h2>

            <a href={myLink.url} >{myLink.url}</a>
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