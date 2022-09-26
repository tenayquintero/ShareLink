import { useParams } from "react-router-dom";
// import useFetch from "../../hooks/useFetch";
import useFetch from 'fetch-suspense'
import { useUser } from "../../context/UserContext";

const GetUser = () => {

    const { id } = useParams();
    const user = useUser()

    const userInformation = useFetch('http://127.0.0.1:3000/users/' + id, {
        headers: user ? { 'Authorization': user.data } : {}
    })
    const { email, name, perfil } = userInformation.data

    return (
        <section>
            <ul>
                <>
                    <li>{email}</li>
                    <li>{name}</li>
                    <li><img src={perfil} alt='perfil'></img></li>
                </>
            </ul>
        </section>
    )

}
export default GetUser;