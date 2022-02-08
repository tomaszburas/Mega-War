import {Router} from "express";
import {AppController} from "../controllers/app-controller";

export const appRouter = Router();

appRouter
    .get('/profile', AppController.Profile)
