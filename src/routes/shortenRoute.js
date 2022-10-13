import { Router } from "express";
import shortenMiddleware from "../middlewares/shortenMiddleware.js";
import shortenController from "../controllers/shortenController.js";
import authorizationMiddleware from "../middlewares/authorizationMiddleware.js";

const shorten = Router();

shorten.post(
  "/urls/shorten",
  authorizationMiddleware,
  shortenMiddleware,
  shortenController
);

export default shorten;
