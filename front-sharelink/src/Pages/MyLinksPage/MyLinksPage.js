import ListMyLinks from "../../components/ListMyLinks/ListMyLinks";
import Submenu from "../../components/Submenu/Submenu";

//Aquí van los los links compartidos del usuario logeado.
const MyLinksPage = () =>{
    return(
        <section className="linksPage">
            <Submenu></Submenu>
            <ListMyLinks />
        </section>
    )
}

export default MyLinksPage;