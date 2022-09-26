import noImage from '../../img/photo-no-image-available.jpg'
import './OneLink.css'
const OneLink = ({ link }) => {
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
                <p>vote: {link.voteAVG}</p>
            </main>
            <footer>
                <p className='author'>create by {link.email}</p>
            </footer>
        </section>
    )

}

export default OneLink;