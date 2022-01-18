import axios from "axios";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import CommentPost from "./CommentPost";
import CreateNewPost from "./CreateNewPost";
import Search from "./Search";

const Home = ({ token }) => {
  const [postes, setPostes] = useState([]);
  const [userName, setUserName] = useState("");

  //update
  const [newPost, setNewPost] = useState("");
  const [updated, setUpdated] = useState(false);

  /////comment
  const [comment, setComment] = useState("");
  const [idPost, setIdPost] = useState("");
  useEffect(() => {
    allPostes();
  });
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
  /////add comment
  const addComment = (id) => {
    axios
      //send data from body object
      .post(
        `http://localhost:5000/postes/${id}/comments`,
        { comment },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        setIdPost(id);
        setComment("");
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
    postes.map((el, index) => {
      return (
        <div className="post-section" key={index}>
          <form>
            {el.avatar ? (
              <img
                width={70}
                height={70}
                src={`http://localhost:5000/uploads/${el?.avatar}`}
                alt="media"
              />
            ) : (
              <img
                width={70}
                height={70}
                src={`https://ui-avatars.com/api/?name=${el.name
                  ?.split(" ")
                  .join("+")}`}
                alt="media"
              />
            )}
            <h2>{el.name || el.userName}</h2>
            <h5>{"@" + el.userName}</h5>
            {userName === el.userName ? (
              <>
                <button
                  type="button"
                  className="update-button"
                  id={el._id}
                  onClick={() => updatePost(el._id)}
                >
                  Update
                </button>
                <button
                  type="button"
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
            <h4>{el?.poste}</h4>
            <hr />
            {el.fileName && (
              <img
                className="image-post"
                height={300}
                src={`http://localhost:5000/uploads/${el?.fileName}`}
                alt="media"
              />
            )}

            {/* comment show */}
            {el.comments.map((el, i) => {
              return (
                <CommentPost
                  userName={userName}
                  key={i}
                  el={el}
                  allPostes={allPostes}
                  token={token}
                  idPost={idPost}
                />
              );
            })}
            <div className="form">
              <input
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                className="comment-input"
                type="text"
                value={comment}
                placeholder="Comment..."
                required
              />
            </div>
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
                      type="button"
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
              </>
            ) : (
              <></>
            )}
            <div className="post-buttons">
              <button
                type="button"
                className="add-button"
                onClick={() => addComment(el._id)}
              >
                Add Comment
              </button>
            </div>
          </form>
        </div>
      );
    });
  ///////////jsx code
  return (
    <div className="home-page">
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
