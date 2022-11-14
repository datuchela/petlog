require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.1.16:3000",
    "http://localhost:5050",
    "http://192.168.1.16:5050",
    "https://petlog.datuchela.com",
  ],
  preflightContinue: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes and custom middleware
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const petsRouter = require("./routes/pets");
const speciesRouter = require("./routes/species");
const remindersRouter = require("./routes/reminders");
const { error } = require("./controllers/error");

// For Health-check
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/species", speciesRouter);
app.use("/api/reminders", remindersRouter);

app.use("/api/*", error); // handle /api/ errors

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
