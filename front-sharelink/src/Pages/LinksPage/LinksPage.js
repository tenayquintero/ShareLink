import ListLinks from "../../components/ListLinks/ListLinks"
import NewLink from "../../components/NewLink/NewLink"
import './LinksPage.css'

const LinksPage = ({ response, setResponse })=>{
    return(
        <section className="linksPage">
            <NewLink setResponse={setResponse} response={response} />
           <ListLinks response={response}/>
        </section>
    )
}

export default LinksPage;