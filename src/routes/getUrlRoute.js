import { Router } from "express";
import getUrlController from "../controllers/getUrlController.js";

const route = Router();

route.get("/urls/:id", getUrlController);

export default route;
