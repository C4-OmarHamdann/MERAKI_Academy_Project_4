import axios from "axios";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import CreateNewPost from "./CreateNewPost";

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

  /////delete articles
  const deletePoste = ({ target }) => {
    axios
      //send data from body object
      .delete(`http://localhost:5000/postes/${target.id}`)
      .then((result) => {
        allPostes();
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
          {el.fileName && (
            <img
              width={500}
              height={300}
              src={`http://localhost:5000/uploads/${el?.fileName}`}
              alt="media"
            />
          )}

          {userName === el.userName ? (
            <>
              <button className="update-button" id={el._id}>
                Update
              </button>
              <button
                className="delete-button"
                id={el._id}
                onClick={deletePoste}
              >
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
      <CreateNewPost token={token} allPost={allPostes} />
      {postesMap?.length ? <>{postesMap}</> : <h2>NO Postes</h2>}
      <Link to="/login">
        {" "}
        <button
          onClick={() => {
            localStorage.removeItem("userToken");
          }}
          className="delete-button"
        >
          logout
        </button>
      </Link>
    </div>
  );
};
export default Home;
