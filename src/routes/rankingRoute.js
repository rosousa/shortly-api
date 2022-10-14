import { Router } from "express";
import rankingController from "../controllers/rankingController.js";

const route = Router();

route.get("/ranking", rankingController);

export default route;
