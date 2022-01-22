import axios from "axios";
import React, { useState } from "react";

const CommentPost = ({ token, idPost, allPostes, el, userName }) => {
  const [updatedComment, setUpdatedComment] = useState(false);
  const [newComment, setNewComment] = useState();

  //////////delete comment
  const deleteComment = (id) => {
    axios
      //send data from body object
      .delete(
        `http://localhost:5000/postes/comments/${id}?post=${idPost}`,

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
  return (
    <div className="comment">
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
      <h5 className="commenter-name">{el.commenter}</h5>
      {userName === el.commenter ? (
        <>
          <button
            type="button"
            className="delete-button"
            id={el._id}
            onClick={() => deleteComment(el._id)}
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
            onClick={() => {
              setUpdatedComment(!updatedComment);

              updateComment(el._id);
            }}
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

      <p className="commenter-comment">- {el.comment}</p>
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
                type="button"
                className="close-button"
                onClick={() => {
                  setUpdatedComment(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="rgba(29, 161, 242, 1)"
                  className="bi bi-x-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CommentPost;
