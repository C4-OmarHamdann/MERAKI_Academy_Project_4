import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ loggedin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setmessage] = useState("");

  const navigate = useNavigate();
  const body = {
    email: email,
    password: password,
  };
  const register = () => {
    navigate("/register");
  };
  const loginUser = () => {
    //show backend server
    axios
      //send data from body object
      .post("http://localhost:5000/login", body)
      .then((result) => {
        setToken(result.data.token);
        localStorage.setItem("userToken", result.data.token);
        loggedin(true);
        navigate("/home");
      })
      .catch((err) => {
        //if error

        setmessage(err.response.data.message);
      });
  };
  return (
    <div className="blue form">
      <h1>Login</h1>
      <label>Email</label>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <label>Password</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
      />
      <button onClick={loginUser}>Login</button>
      <h2>OR</h2>
      <button style={{ backgroundColor: "blue" }} onClick={register}>
        Register
      </button>
      {message ? <p className="error">{message}</p> : <></>}
    </div>
  );
};
export default Login;
