import axios from "axios";
import React, { useState, useEffect } from "react";

const Home = ({ token }) => {
  const [postes, setPostes] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    allPostes();
  }, []);
  ///// get all postes
  const allPostes = () => {
    axios
      //send data from body object
      .get(`http://localhost:5000/postes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setPostes(result.data.postes);
        setUserName(result.data.userName);
      })
      .catch((err) => {
        //if error

        console.log(err.response.data);
      });
  };

  /////show all postes
  const postesMap =
    postes &&
    postes.map((el, i) => {
      return (
        <div className="poste-card" key={i}>
          <h2>{el.name || el.userName}</h2>
          <h5>{"@" + el.userName}</h5>
          <h4>{el?.poste}</h4>
          <img
            width={500}
            height={300}
            src={`http://localhost:5000/uploads/${el?.fileName}`}
            alt="media"
          />

          {userName === el.userName ? (
            <>
              <button className="update-button" id={el._id}>
                Update
              </button>
              <button className="delete-button" id={el._id}>
                Delete
              </button>
            </>
          ) : (
            <></>
          )}
          <hr />
        </div>
      );
    });
  ///////////jsx code
  return (
    <div className="blue">
      {postesMap?.length ? <>{postesMap}</> : <h2>NO Postes</h2>}
    </div>
  );
};
export default Home;
