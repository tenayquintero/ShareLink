import { useState } from 'react'
import { useUser } from '../context/UserContext'

const useSendData = (url) => {
    const user = useUser();
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState()

    const sendData = async (data, method = 'POST') => {
        setStatus('loading')
        const res = await fetch(url, {
            method: method,
            headers: user ? {
                'Authorization': user.data,
                "Content-type": "application/json",
            } : {},

            body: JSON.stringify(data)
        })
        const resData = await res.json()
        setResponse(resData)
        if (res.ok) {
            setStatus('success')
        } else {
            setStatus('error')
        }
    }
    return [status, response, sendData]
}

export default useSendData