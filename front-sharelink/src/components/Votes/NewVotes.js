import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./NewVotes.css";

const NewVotes = ({ id, value }) => {
  const user = useUser();

  const [avg, setAvg] = useState(value);
  const [vote, setVote] = useState(null);
  const [response, setResponse] = useState();

  const doVote = useCallback(async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND}/links/${id}/votes`,
      {
        method: "POST",
        headers: user
          ? {
              Authorization: user.data,
              "Content-type": "application/json",
            }
          : {},
        body: JSON.stringify({ vote }),
      }
    );
    const resData = await res.json();
    console.log(resData, "soy resdata");
    setResponse(resData);
    setVote(null);

    setAvg(resData.data.votes);
  }, [id, user, vote]);

  useEffect(() => {
    if (vote) doVote();
  }, [vote, doVote]);

  //Función para redondear el total de los votos
  function financial(x) {
    return Number.parseFloat(x).toFixed(1);
  }

  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="votes">
      <span className="value">{financial(avg)}</span>
      <span onClick={() => setVote(1)}>{avg >= 1 ? "★" : "☆"}</span>
      <span onClick={() => setVote(2)}>{avg >= 2 ? "★" : "☆"}</span>
      <span onClick={() => setVote(3)}>{avg >= 3 ? "★" : "☆"}</span>
      <span onClick={() => setVote(4)}>{avg >= 4 ? "★" : "☆"}</span>
      <span onClick={() => setVote(5)}>{avg >= 5 ? "★" : "☆"}</span>

      {response?.status === "ok" && <p>Gracias por tu Voto</p>}
      {response?.status === "error" && <p>{response?.message}</p>}
    </div>
  );
};

export default NewVotes;
