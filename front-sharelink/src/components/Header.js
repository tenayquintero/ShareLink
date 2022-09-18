import Auth from "./Auth"
import './Header.css'

const Header = () =>{
    return(
        <header className="header-sharelink">
            <h1>ShareLink</h1>
            <Auth />

        </header>
    )
}

export default Header;