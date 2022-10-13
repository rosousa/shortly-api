import { Router } from "express";
import shortenMiddleware from "../middlewares/shortenMiddleware.js";
import shortenController from "../controllers/shortenController.js";

const shorten = Router();

shorten.post("/urls/shorten", shortenMiddleware, shortenController);

export default shorten;
