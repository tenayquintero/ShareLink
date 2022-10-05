import { useState } from 'react'

function Accordion({  children, name }) {
    const [show, setShow] = useState(false)

    return (
        <>
            {show && children}
            <button className={name} onClick={() => setShow(!show)}>
                {show ? 'X' : '🌪️'}
            </button>
        </>
    )
}

export default Accordion