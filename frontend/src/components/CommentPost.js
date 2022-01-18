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
            type="button"
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
            type="button"
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
};

export default CommentPost;
