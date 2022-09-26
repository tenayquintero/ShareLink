import ListLinks from "../../components/ListLinks/ListLinks"
import NewLink from "../../components/NewLink/NewLink"
import './LinksPage.css'

const LinksPage = ({ fetchKey, reload })=>{
    return(
        <section className="linksPage">
            <NewLink reload={reload} />
            <ListLinks fetchKey={fetchKey}/>
        </section>
    )
}

export default LinksPage;