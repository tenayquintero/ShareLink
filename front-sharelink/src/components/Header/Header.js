import Auth from '../Auth/Auth'
import './Header.css'

const Header = ({ editUser }) =>{
    return(
        <header className="header-sharelink">
           
            <Auth editUser={editUser}/>

        </header>
    )
}

export default Header;