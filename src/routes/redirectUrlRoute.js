import { Router } from "express";
import redirectUrlController from "../controllers/redirectUrlController.js";

const route = Router();

route.get("/urls/open/:shortUrl", redirectUrlController);

export default route;
