import { useParams } from "react-router-dom";
//  import useFetch from "../../hooks/useFetch";
import useFetch from "fetch-suspense";
import { useUser } from "../../context/UserContext";
import "./GetUser.css";

const GetUser = () => {
  const { id } = useParams();
  const user = useUser();

  const userInformation = useFetch("http://127.0.0.1:3000/users/" + id, {
    headers: user ? { Authorization: user.data } : {},
  });
  const { email, name, perfil } = userInformation.data;

  return (
    <section className="getUser">
      <main>
        <h2>{name}</h2>
        <img src={`${process.env.REACT_APP_BACKEND}/${perfil}`} alt={perfil} />
      </main>
      <footer>
        <p>{email}</p>
      </footer>
    </section>
  );
};
export default GetUser;
