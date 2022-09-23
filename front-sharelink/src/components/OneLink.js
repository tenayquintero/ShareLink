import './OneLink.css'
const OneLink = ({ link }) => {
    return (
        <section className='link'>
            <h2>{link.title}</h2>
            <a href={link.url}> <img src={link.image} alt={link.title} /></a>
            <p>{link.description}</p>
            <p>vote: {link.voteAVG}</p>
            <p>create by {link.email}</p>
        </section>
    )

}

export default OneLink;