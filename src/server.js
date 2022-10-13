import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authenticationRoutes from "./routes/authenticationRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(authenticationRoutes);

app.get("/status", (req, res) => {
  res.sendStatus(200);
});

app.listen(process.env.PORT, () =>
  console.log("Listening on port " + process.env.PORT)
);
