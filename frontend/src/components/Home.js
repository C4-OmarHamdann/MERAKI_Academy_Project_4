import axios from "axios";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import CreateNewPost from "./CreateNewPost";
import Search from "./Search";

const Home = ({ token }) => {
  const [postes, setPostes] = useState([]);
  const [userName, setUserName] = useState("");
  //update

  const [newPost, setNewPost] = useState("");
  const [updated, setUpdated] = useState(false);
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

  /////update post

  //function
  const updatePost = (id) => {
    axios
      //send data from body object
      .put(`http://localhost:5000/postes/${id}`, {
        poste: newPost,
      })
      .then((result) => {
        setUpdated(!updated);

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
          {el.avatar ? (
            <img
              width={50}
              height={50}
              src={`http://localhost:5000/uploads/${el?.avatar}`}
              alt="media"
            />
          ) : (
            <img
              width={50}
              height={50}
              src={`https://ui-avatars.com/api/?name=${el.name
                ?.split(" ")
                .join("+")}`}
              alt="media"
            />
          )}
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
              {updated ? (
                <>
                  <div className="form">
                    <textarea
                      onChange={(e) => {
                        setNewPost(e.target.value);
                      }}
                      cols="30"
                      rows="10"
                      placeholder="New post..."
                      required
                    ></textarea>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => {
                      setUpdated(false);
                    }}
                  >
                    close
                  </button>
                </>
              ) : (
                <></>
              )}
              <button
                className="update-button"
                id={el._id}
                onClick={() => updatePost(el._id)}
              >
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

      <Search setPost={setPostes} allPost={allPostes} />

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
