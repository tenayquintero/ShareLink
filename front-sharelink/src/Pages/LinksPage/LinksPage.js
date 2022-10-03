import ListLinks from "../../components/ListLinks/ListLinks"
import Modal from "../../components/Modal/Modal"
import NewLink from "../../components/NewLink/NewLink"
import Search from "../../components/Search/Search"
import Submenu from "../../components/Submenu/Submenu"
import './LinksPage.css'

const LinksPage = ({ fetchKey, reload, result, setResult }) => {
    return (
        <section className="linksPage">
            <Submenu className='submenuWeb' />
            <Modal>
                <Submenu />
            </Modal>
            <div>
                <Search setResult={setResult} fetchKey={fetchKey}/>
                <NewLink reload={reload}  />
                <ListLinks reload={reload} result={result} fetchKey={fetchKey} />
            </div>

        </section>
    )
}

export default LinksPage;