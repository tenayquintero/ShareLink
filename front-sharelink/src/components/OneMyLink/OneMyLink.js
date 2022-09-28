// import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import noImage from '../../img/photo-no-image-available.jpg'
import NewVotes from "../Votes/NewVotes";
import './OneMyLink.css'

const OneMyLink = ({ myLink }) => {
    return (
        <section className='myLink'>
            <main>
            <a href={myLink.url}>
                {
                    myLink.image === 'photoDefault'
                        ? <img src={noImage} alt={myLink.title} />
                        : <img src={myLink.image} alt={myLink.title} />
                }
            </a>
            <h2>{myLink.title}</h2>
            <p>{myLink.description}</p>
            <NewVotes />
            </main>
            <footer>
            <p>create by me</p>
            <button>
                <Link to={`/mylinks/delete/${myLink.id_link}`} >
                    delete
                </Link>
            </button>
            <button>
                <Link to={`/mylinks/edit/${myLink.id_link}`} >
                    edit
                </Link>
            </button>
            </footer>
        </section>
    )
}

export default OneMyLink;