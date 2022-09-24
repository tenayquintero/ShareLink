import ListMyLinks from "../../components/ListMyLinks/ListMyLinks";

//Aquí van los los links compartidos del usuario logeado.
const MyLinksPage = () =>{
    return(
        <section className="linksPage">
            <ListMyLinks />
        </section>
    )
}

export default MyLinksPage;