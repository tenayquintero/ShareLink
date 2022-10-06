import { Link, useParams } from "react-router-dom";
import { useDeleteLink } from "../api";
import MessageStatus from "../MessageStatus/MessageStatus";
import "./DeleteLink.css";

const DeleteLink = () => {
  const { id } = useParams();

  const [, response, sendData] = useDeleteLink(id);

  const deleteLink = async () => {
    sendData({}, "DELETE");
  };
  return (
    <div className="bg">
      <section className="fg">
        {!response && (
          <section className="deleteLink_confirmation">
            <p>¿Quieres borrar tu publicación?</p>
            <div>
              <button onClick={() => deleteLink()}>si</button>
              <Link to="/mylinks">
                {" "}
                <button>No</button>
              </Link>
            </div>
          </section>
        )}
        {response?.status === "ok" && (
          <>
            <MessageStatus
              message="Tu publicación se ha borrado correctamente"
              navigate="/mylinks"
            />
          </>
        )}
      </section>
    </div>
  );
};

export default DeleteLink;
