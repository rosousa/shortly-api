import { Router } from "express";
import authorizationMiddleware from "../middlewares/authorizationMiddleware.js";
import getUserDataController from "../controllers/getUserDataController.js";

const route = Router();

route.get("/users/me", authorizationMiddleware, getUserDataController);

export default route;
