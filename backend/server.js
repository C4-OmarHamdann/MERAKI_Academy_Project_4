const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");

// Import Routers

const usersRouter = require("./routes/users");

app.use(cors());

app.use(express.json());

const PORT = 5000;

// Routes Middleware

app.use("/users", usersRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
