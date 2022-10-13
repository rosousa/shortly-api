import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authenticationRoutes from "./routes/authenticationRoutes.js";
import shortenRoute from "./routes/shortenRoute.js";
import getUrlRoute from "./routes/getUrlRoute.js";
import redirectUrlRoute from "./routes/redirectUrlRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(authenticationRoutes);
app.use(shortenRoute);
app.use(getUrlRoute);
app.use(redirectUrlRoute);

app.get("/status", (req, res) => {
  res.sendStatus(200);
});

app.listen(process.env.PORT, () =>
  console.log("Listening on port " + process.env.PORT)
);
