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

  /////comment
  const [comment, setComment] = useState("");
  const [updatedComment, setUpdatedComment] = useState(false);
  const [newComment, setNewComment] = useState("");

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
        setComment("");
        allPostes();
      })
      .catch((err) => {
        //if error
        console.log(err.response.data);
      });
  };

  //////////delete comment
  const deleteComment = (id) => {
    axios
      //send data from body object
      .delete(`http://localhost:5000/postes/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        allPostes();
      })
      .catch((err) => {
        //if error

        console.log(err.response.data);
      });
  };

  //////////update comment
  const updateComment = (id) => {
    axios
      //send data from body object
      .put(
        `http://localhost:5000/postes/comments/${id}`,
        { comment: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
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
    postes.map((el, index) => {
      return (
        <div className="poste-card red" key={index}>
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
          <h4>{el?.poste}</h4>

          {el.fileName && (
            <img
              width={500}
              height={300}
              src={`http://localhost:5000/uploads/${el?.fileName}`}
              alt="media"
            />
          )}

          {/* comment show */}
          {el.comments.map((el, i) => {
            return (
              <div key={i} className="purple">
                {el.avatar ? (
                  <img
                    width={30}
                    height={30}
                    src={`http://localhost:5000/uploads/${el?.avatar}`}
                    alt="media"
                  />
                ) : (
                  <img
                    width={30}
                    height={30}
                    src={`https://ui-avatars.com/api/?name=${el.commenter}`}
                    alt="media"
                  />
                )}
                <h5>{el.commenter}</h5>
                <p>- {el.comment}</p>
                {userName === el.commenter ? (
                  <>
                    {updatedComment ? (
                      <>
                        <div className="form">
                          <input
                            type="text"
                            onChange={(e) => {
                              setNewComment(e.target.value);
                            }}
                            placeholder="New comment..."
                            required
                          />
                        </div>
                        <button
                          className="delete-button"
                          onClick={() => {
                            setUpdatedComment(false);
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
                      onClick={() => {
                        setUpdatedComment(!updatedComment);

                        updateComment(el._id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="delete-button"
                      id={el._id}
                      onClick={() => deleteComment(el._id)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
          <div className="form">
            <input
              onChange={(e) => {
                setComment(e.target.value);
              }}
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
          <button className="add-button" onClick={() => addComment(el._id)}>
            Add Comment
          </button>
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
