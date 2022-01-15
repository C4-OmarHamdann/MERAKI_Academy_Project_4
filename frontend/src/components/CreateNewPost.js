import React from "react";
import { useState } from "react";
import axios from "axios";
import UploadFile from "./UploadFile";

const CreateNewPost = ({ token, allPost }) => {
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
    console.log(formData);
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
    <div className="orange form">
      <textarea
        onChange={({ target }) => {
          setPost(target.value);
        }}
        cols="30"
        rows="10"
        style={{ resize: "none" }}
        value={post}
        placeholder="What's happening?"
      ></textarea>
      <UploadFile file={file} setFile={setFile} />
      <button onClick={addNewPost}>Send</button>
      {cheack == "done" ? (
        <div className="done">The post has been created successfully</div>
      ) : //if error or undfinde
      cheack == "error" ? (
        <div className="error">
          Error happened while creating a new post, please try again
        </div>
      ) : (
        //if undfinde => no change
        <div />
      )}
    </div>
  );
};
export default CreateNewPost;
