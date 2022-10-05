// import useFetch from "../../hooks/useFetch";
import useFetch from "fetch-suspense";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSetUser, useUser } from "../../context/UserContext";
import MessageStatus from "../MessageStatus/MessageStatus";
import "./EditUser.css";

const EditUser = () => {
  const user = useUser();
  const setUser = useSetUser();
  const { id } = useParams();

  const userInformation = useFetch(`http://127.0.0.1:3000/users/${id}`, {
    headers: user ? { Authorization: user.data } : {},
  });

  const [name, setName] = useState(userInformation.data.name || "");
  const [email, setEmail] = useState(userInformation.data.email);
  const [perfil, setPerfil] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [response, setResponse] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("perfil", perfil);

    const res = await fetch(`http://127.0.0.1:3000/users/${id}`, {
      method: "PUT",
      headers: user ? { Authorization: user.data } : {},
      body: formData,
    });
    const data = await res.json();

    setUser({ ...user, ...data });
    setResponse(data);
    setImagePreview(null);
  };
  const handleFile = (e) => {
    const file = e.target.files[0];
    setPerfil(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="bg">
      <form onSubmit={handleSubmit} className="form_editLink">
        <label>
          <p>Nombre</p>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <p>Email</p>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p className="up_photo">Sube tu foto aquí</p>
          <p className="up_photo">📷</p>
          <input
            type="file"
            name="perfil"
            onChange={handleFile}
            className="input_file"
          />
          {imagePreview && (
            <img src={imagePreview} alt="preview" className="imagePreview" />
          )}
        </label>
        <button>Guardar</button>
        {response?.status === "error" && (
          <p className="error">{response?.message}</p>
        )}
        {response?.status === "OK" && (
          <>
            <MessageStatus
              message="Se ha actualizado tu perfil correctamente"
              navigate="/links"
            />
          </>
        )}
      </form>
    </div>
  );
};

export default EditUser;
