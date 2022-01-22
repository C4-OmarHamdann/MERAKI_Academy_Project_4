import React from "react";
import { useState } from "react";

import UploadFile from "./UploadFile";

import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");

  const [userName, setUserName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //upload
  const [file, setFile] = useState("");

  //**************************** */
  //save data in form data
  const formData = new FormData();
  formData.append("firstName", firstName);

  formData.append("userName", userName);

  formData.append("email", email);
  formData.append("password", password);
  formData.append("media", file);

  //************************************* */

  //cheack done or not
  const [cheack, setCheack] = useState("");
  const [message, setMessage] = useState("");
  //add users
  const addUsers = async () => {
    //show backend server
    await axios
      //send data from body object
      .post("http://localhost:5000/users", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((result) => {
        //if add users

        setCheack("done");
      })
      .catch((err) => {
        //if error
        setCheack("error");
        setMessage(err.response.data.message);
        console.log(err.response.data.message);
      });
  };
  return (
    <>
      <div className="authentication">
        <div className="authentication-bg">
          <img
            className="bg"
            src={require("./Images/background.png")}
            alt="signup background"
          />
          <svg
            className="logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
            />
          </svg>
        </div>
        <div className="authentication-form">
          <img src={require("./Images/twitter-36x36.png")} alt="twitter" />

          <h2>Join Twitter today.</h2>
          <div className="authentication-inputs">
            <label>Name</label>
            <input
              type="text"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="Enter Full Name"
              required=""
            />
            <label>User Name</label>
            <input
              type="text"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="User Name"
              required=""
            />

            <label>Email</label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter Email Address"
              required=""
            />
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter Password"
              required=""
            />
            <label>Upload Profile Image</label>
            <UploadFile file={file} setFile={setFile} />

            <p>
              Already have an account?
              <a href="/login">Login</a>
            </p>
            <button onClick={addUsers}>SignUp</button>

            {/* //cheack if add user or not massge
      //if done or undfinde  */}
            {cheack === "done" ? (
              <div className="done">The user has been created successfully</div>
            ) : //if error or undfinde
            cheack === "error" ? (
              message ? (
                <p className="error">{message}</p>
              ) : (
                <></>
              )
            ) : (
              //if undfinde => no change
              <div />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
