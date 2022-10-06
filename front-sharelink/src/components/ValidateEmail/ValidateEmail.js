import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSetUser } from "../../context/UserContext";
import MessageStatus from "../MessageStatus/MessageStatus";
import "./ValidateEmail.css";
const ValidateEmail = () => {
  const { registration_code } = useParams();
  const [message, setMessage] = useState();
  const setUser = useSetUser();

  useEffect(() => {
    const validateFunction = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/users/validate`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ registration_code }),
        }
      );

      const resData = await res.json();
      console.log("resData ", resData);
      if (resData.status === "error") {
        setMessage("error");
      } else {
        setMessage("succes");
      }
    };
    validateFunction();
  }, [registration_code]);

  if (message === "succes") {
    setUser(null);
  }

  return (
    <section className="bg">
      <Link to="home">
        {message === "error" && <p className="fg">Tú código no es válido</p>}
      </Link>

      {message === "succes" && (
        <>
          <MessageStatus
            message="Te has registrado correctamente, ya puedes logearte"
            navigate="/login"
          />
        </>
      )}
    </section>
  );
};
export default ValidateEmail;
