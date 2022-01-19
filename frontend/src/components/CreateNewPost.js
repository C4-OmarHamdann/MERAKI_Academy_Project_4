import React from "react";
import { useState } from "react";
import axios from "axios";

const CreateNewPost = ({ token, allPost, userName, avatarUser }) => {
  const [post, setPost] = useState("");
  const [cheack, setCheack] = useState("");
  //upload
  const [file, setFile] = useState("");
  //**************************** */
  const formData = new FormData();
  formData.append("media", file);
  formData.append("poste", post);
  //************************************* */

  const addNewPost = () => {
    axios
      //send data from body object
      .post("http://localhost:5000/postes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,

          "content-type": "multipart/form-data",
        },
      })
      .then((result) => {
        //if add users
        setPost("");
        allPost();
        setCheack("done");
      })
      .catch((err) => {
        //if error
        setCheack("error");

        console.log(err);
      });
  };
  return (
    <div className="add-new-tweet">
      <form>
        <div className="post-from-me">
          {avatarUser ? (
            <img
              width={70}
              height={70}
              src={`http://localhost:5000/uploads/${avatarUser}`}
              alt="media"
            />
          ) : (
            <img
              width={70}
              height={70}
              src={`https://ui-avatars.com/api/?name=${userName}`}
              alt="media"
            />
          )}
          <textarea
            onChange={({ target }) => {
              setPost(target.value);
            }}
            rows="10"
            style={{ resize: "none" }}
            value={post}
            placeholder="What's happening?"
          ></textarea>
        </div>

        <div className="new-tweet-options">
          <div className="add-icons">
            <svg
              viewBox="0 0 24 24"
              className="r-13gxpu9 r-4qtqp9 r-yyyyoo r-1q142lx r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
            >
              <g>
                <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path>
                <circle cx="8.868" cy="8.309" r="1.542"></circle>
              </g>
            </svg>
          </div>

          <input
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
            type="file"
            className="tweet-upload"
          ></input>
          <br />
          {file && <img height={300} src={URL.createObjectURL(file)} alt="" />}
          <div className="tweet">
            <div className="btn tweet-btn text-center">
              <button type="button" onClick={addNewPost}>
                Tweet
              </button>
            </div>
          </div>
        </div>

        {cheack === "done" ? (
          <div className="done">The post has been created successfully</div>
        ) : //if error or undfinde
        cheack === "error" ? (
          <div className="error">
            Error happened while creating a new post, please try again
          </div>
        ) : (
          //if undfinde => no change
          <div />
        )}
      </form>
    </div>
  );
};
export default CreateNewPost;
