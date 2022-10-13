import { Router } from "express";
import signupController from "../controllers/signupController.js";
import signinController from "../controllers/signinController.js";
import {
  signupMiddleware,
  signinMiddleware,
} from "../middlewares/authMiddlewares.js";

const auth = Router();

auth.post("/signup", signupMiddleware, signupController);
auth.post("/signin", signinMiddleware, signinController);

export default auth;
