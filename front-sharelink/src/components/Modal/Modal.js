import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import './Modal.css'

function Modal() {
    const [show, setShow] = useState(false)
    const user = useUser()

    return (
        <div className="modal">
            <div onClick={() => setShow(true)} className='buttonSubmenu'>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {show &&
                <div className="bg" onClick={() => setShow(false)}>
                    <div className="fg" onClick={e => e.stopPropagation()}>
                        <menu className='submenuMobile'>
                            <h2>Tools</h2>
                            <ul>
                                <li>
                                    <Link to={`/users/edit/${user?.id}`}> Editar perfil</Link>
                                </li>
                                <li>
                                    Cambiar contraseña
                                </li>
                            </ul>
                        </menu>
                    </div>
                </div>
            }
        </div>
    )
}

export default Modal