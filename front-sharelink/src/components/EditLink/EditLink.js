import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useEditLink } from "../api";
import useFetch from "fetch-suspense";
import MessageStatus from "../MessageStatus/MessageStatus";
import "./EditLink.css";

const EditLink = () => {
  const user = useUser();
  const { id } = useParams();

  const link = useFetch(`${process.env.REACT_APP_BACKEND}/links/${id}`);

  const [title, setTitle] = useState(link.data.title);
  const [url, setUrl] = useState(link.data.url);
  const [description, setDescription] = useState(link.data.description);

  const [, response, sendData] = useEditLink(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendData({ title, url, description }, "PUT");
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit} className="editLink">
      <label>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title..."
        />
      </label>
      <label>
        <input
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="url..."
        />
      </label>
      <label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description..."
        />
      </label>
      <button>Guardar</button>
      {response?.status === "error" && (
        <p>Recuerda que todos los campos son obligatorios</p>
      )}
      {response?.status === "OK" && (
        <>
          <MessageStatus
            message="Tu link se ha modificado correactamente"
            navigate="/mylinks"
          />
        </>
      )}
    </form>
  );
};

export default EditLink;
