import './OneLink.css'
const OneLink = ({ link }) =>{
    return(
        <section className='link'>
        <h2>{link.title}</h2>
        <a href={link.url}>{link.url}</a>
        <p>vote: {link.vote}</p>
        <p>create by {link.email}</p>
        </section>
    )

}

export default OneLink;