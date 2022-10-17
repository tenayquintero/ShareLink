import { useParams } from "react-router-dom";
import noImage from "../../img/avatarDefault.png";
import { useGetUser } from "../api";
import MessageStatus from "../MessageStatus/MessageStatus";
import "./GetUser.css";

const GetUser = () => {
  const { id } = useParams();

  const [userInformation, error] = useGetUser(id);

  return (
    <section className="getUser">
      <main>
        <h2>{userInformation?.data.name}</h2>
        {userInformation?.data.perfil === null ? (
          <img src={noImage} alt="noImage" />
        ) : (
          <img
            src={`${process.env.REACT_APP_BACKEND}/${userInformation?.data.perfil}`}
            alt={userInformation?.data.name}
          />
        )}
      </main>
      <footer>
        <p>{userInformation?.data.email}</p>
      </footer>
      {error && (
        <MessageStatus
          title="Ups!!!"
          message="El usuario no existe"
          navigate="/links"
        />
      )}
    </section>
  );
};
export default GetUser;
