import {Router} from "express";
import {MainController} from "../controllers/main-controller";

export const mainRouter = Router();

mainRouter
    .get('/', MainController.homePage)
    .get('/sign-up', MainController.signUp)
    .get('/sign-in', MainController.signIn)

