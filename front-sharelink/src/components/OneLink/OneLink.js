import { NavLink } from 'react-router-dom';
import noImage from '../../img/photo-no-image-available.jpg'
import NewVotes from '../Votes/NewVotes';
import './OneLink.css'
const OneLink = ({ link, reload }) => {
    return (
        <section className='link'>
            <main>
                <a href={link.url}>
                    {
                        link.image === 'photoDefault' 
                            ? <img src={noImage} alt={link.title} />
                            : <img src={link.image} alt={link.title} />
                    }
                </a>
                <h2>{link.title}</h2>
                <p>{link.description}</p>
            </main>
            <footer>
                <NewVotes value={link.voteAVG} id={link.id_link} reload={reload} />
                <p className='author'>create by <NavLink to={'/users/'+link.id_user } >{link.email}</NavLink></p>
            </footer>
        </section>
    )

}

export default OneLink;