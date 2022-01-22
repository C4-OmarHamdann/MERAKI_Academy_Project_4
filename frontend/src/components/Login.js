import React from "react";
import { useState } from "react";
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
        <h1>Happening Now</h1>
        <h2>Join Twitter today.</h2>
        <div className="authentication-inputs">
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
          <button onClick={loginUser}>Login</button>
          {message ? <p className="error">{message}</p> : <></>}
        </div>

        <p>
          You don't have an account?{" "}
          <a className="no-account" onClick={register}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};
export default Login;
