import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadFile from "./UploadFile";

import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //upload
  const [file, setFile] = useState("");

  //**************************** */
  //save data in form data
  const formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("userName", userName);
  formData.append("age", age);
  formData.append("country", country);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("media", file);

  //************************************* */

  const navigate = useNavigate();

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
    <div className="authentication">
      <h2>Register</h2>
      {/* save value */}
      <form>
        <label>First Name</label>
        <input
          type="text"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          placeholder="First Name"
          required
        />
        <label>Last Name</label>
        <input
          type="text"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          placeholder="Last Name"
          required
        />
        <label>User Name</label>
        <input
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          placeholder="User Name"
          required
        />
        <label>Age</label>
        <input
          type="number"
          onChange={(e) => {
            setAge(e.target.value);
          }}
          placeholder="Age"
          required
        />
        <label>Country</label>
        <input
          type="text"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          placeholder="Country"
          required
        />
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
          required
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          required
        />
        <label>Upload Profile Image</label>
        <UploadFile file={file} setFile={setFile} />
        <hr />
        <p>
          Already have an account?
          <a
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </a>
        </p>
        <button onClick={addUsers}>Register</button>

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
      </form>
    </div>
  );
};
export default Register;
