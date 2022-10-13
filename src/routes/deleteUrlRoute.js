import { Router } from "express";
import deleteUrlController from "../controllers/deleteUrlController.js";
import authorizationMiddleware from "../middlewares/authorizationMiddleware.js";

const route = Router();

route.delete("/urls/:id", authorizationMiddleware, deleteUrlController);

export default route;
