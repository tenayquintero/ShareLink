// import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useGetMyLinks } from "../api";
import OneMyLink from "../OneMyLink/OneMyLink";

const ListMyLinks = () => {
  const user = useUser();
  const [myLinks] = useGetMyLinks();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <ul className="listLinks">
        {myLinks?.result.length === 0 && (
          <p className="messageResponse">Aún no tienes enlaces compartidos</p>
        )}

        {myLinks?.result.map((item) => (
          <li key={item.id_link}>
            <OneMyLink myLink={item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListMyLinks;
