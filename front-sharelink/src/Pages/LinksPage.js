import ListLinks from "../components/ListLinks"
import './LinksPage.css'
import NewLink from "../components/NewLink";


const LinksPage = ({ response, setResponse })=>{
    return(
        <section className="linksPage">
            <NewLink setResponse={setResponse} response={response} />
           <ListLinks response={response}/>
        </section>
    )
}

export default LinksPage;