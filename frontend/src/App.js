import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const token = localStorage.getItem("userToken");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  return (
    <div className="App">
      <h1>Welcome To App</h1>

      <Routes>
        {" "}
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login loggedin={setisLoggedIn} />}
          setisLoggedIn={setisLoggedIn}
        />
        <Route
          path="/home"
          element={
            token ? <Home token={token} /> : <Login loggedin={setisLoggedIn} />
          }
          setisLoggedIn={setisLoggedIn}
        />
        <Route
          path="*"
          element={
            <>
              <h1 className="not-found">404</h1>
              <p>This page not found</p>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
