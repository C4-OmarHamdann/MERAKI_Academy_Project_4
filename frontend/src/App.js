import "./App.css";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="App">
      <h1>Welcome To App</h1>
      <Routes>
        {" "}
        <Route path="/" element={<Register />} />
        <Route path="/users" element={<Register />} />
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
