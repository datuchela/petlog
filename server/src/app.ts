import Express from "express";
import cors from "cors";
import dotenv from "dotenv";

// routes and custom middleware
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import petsRouter from "./routes/pets";
import speciesRouter from "./routes/species";
import remindersRouter from "./routes/reminders";
import { error } from "./controllers/error";

dotenv.config();

const app = Express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: ["http://localhost:3000", "https://petlog.datuchela.com"],
  preflightContinue: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

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
