import { Router } from "express";
import signupController from "../controllers/signupController.js";
import { signupMiddleware } from "../middlewares/authMiddlewares.js";

const auth = Router();

auth.post("/signup", signupMiddleware, signupController);

export default auth;
