import ListLinks from "../../components/ListLinks/ListLinks"
import Modal from "../../components/Modal/Modal"
import NewLink from "../../components/NewLink/NewLink"
import Submenu from "../../components/Submenu/Submenu"
import './LinksPage.css'

const LinksPage = ({ fetchKey, reload }) => {
    return (
        <section className="linksPage">
            <Submenu className='submenuWeb' />
            <Modal>
                <Submenu />
            </Modal>
            <div>
                <NewLink reload={reload} />
                <ListLinks fetchKey={fetchKey} reload={reload} />
            </div>

        </section>
    )
}

export default LinksPage;