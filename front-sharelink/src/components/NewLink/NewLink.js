import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useNewLink } from "../api";
import "./NewLink.css";

const NewLink = ({ reload }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const user = useUser();

  const [, response, sendData] = useNewLink();

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendData({ title, url, description });
    reload();
    setTitle("");
    setUrl("");
    setDescription("");
  };

  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="newLink">
      <form onSubmit={handleSubmit} className="form_newLink">
        <p>
          Comparte tus enlaces aquí y ayuda a otras personas en su día a día
        </p>
        <input
          placeholder="título...."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="url....."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <textarea
          placeholder="descripción....."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Compartir</button>
      </form>
      {response?.status === "ok" && (
        <p>!Felicidades¡ Se ha creado tu publicación correctamente</p>
      )}
      {response?.status === "error" && (
        <p className="error">
          !Ups¡ No se ha relaizado tu publicación recuerda rellenar todos los
          campos
        </p>
      )}
    </div>
  );
};

export default NewLink;
