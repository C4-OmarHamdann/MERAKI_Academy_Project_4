import axios from "axios";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import AsideLeft from "./AsideLeft";

import AsideRight from "./AsideRight";
import CommentPost from "./CommentPost";
import CreateNewPost from "./CreateNewPost";

const Home = ({ token }) => {
  const [postes, setPostes] = useState([]);
  const [userName, setUserName] = useState("");
  const [avatarUser, setAvatarUser] = useState("");

  //update
  const [newPost, setNewPost] = useState("");
  const [updated, setUpdated] = useState(false);

  /////comment
  const [comment, setComment] = useState("");
  const [idPost, setIdPost] = useState("");

  //showMore
  const [limit, setLimit] = useState(2);

  //sort
  const [sort, setSort] = useState(true);

  //newsApi
  const [news, setNews] = useState([]);
  const newsApi = async () => {
    await axios
      //send data from body object
      .get(
        `https://newsapi.org/v2/everything?q=apple&from=2022-01-19&to=2022-01-19&sortBy=popularity&apiKey=9c37824887c144c0abc55a73ea84493c`
      )

      .then((result) => {
        setNews(result.data.articles);
      })
      .catch((err) => {
        //if error

        console.log(err.response.data);
      });
  };

  ///useEffect

  useEffect(() => {
    allPostes();
    newsApi();
  }, []);
  ///// get all postes
  const allPostes = () => {
    {
      //postes.length? setPostes(postes):
      axios
        //send data from body object
        .get(`http://localhost:5000/postes?limit=${limit}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          setPostes(result.data.postes);
          setUserName(result.data.userName);
          setAvatarUser(result.data.avatar);
        })
        .catch((err) => {
          //if error

          console.log(err.response.data);
        });
    }
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
      console.log(postes);
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
                  className="delete-button"
                  id={el._id}
                  onClick={deletePoste}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="rgba(29, 161, 242, 1)"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="update-button"
                  id={el._id}
                  onClick={() => updatePost(el._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="rgb(29, 155, 240)"
                    className="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
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
            {userName === el.commenter ? (
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
    <>
      <div className="grid-screen">
        <AsideLeft userName={userName} avatarUser={avatarUser} />
        <div className="home-page">
          <div className="aside-left-profile">
            <h2>Home</h2>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              onClick={() => {
                postesMap.reverse();

                setSort(!sort);
              }}
              className="StyledIconBase-ea9ulj-0 bWRyML sc-bBXrwG iRQiAu"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16 2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              ></path>
            </svg>
          </div>

          <CreateNewPost
            token={token}
            userName={userName}
            avatarUser={avatarUser}
            allPost={allPostes}
          />

          {postesMap?.length ? (
            <>{sort ? postesMap : postesMap.reverse()}</>
          ) : (
            <h2>NO Postes</h2>
          )}
          <Link to="/login"> </Link>
          <button
            className="showMoreButton"
            onClick={() => {
              setLimit(limit + 2);
              allPostes();
            }}
          >
            Show More
          </button>
        </div>
        <AsideRight news={news} setPostes={setPostes} allPosts={allPostes} />
      </div>
    </>
  );
};
export default Home;
