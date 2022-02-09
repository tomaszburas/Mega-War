import {Router} from "express";
import {AppController} from "../controllers/app-controller";
import {checkAuth} from "../midddleware/authorization";

export const appRouter = Router();

appRouter.use(checkAuth)

appRouter
    .get('/profile', AppController.profile)
    .get('/configurator', AppController.configureWarriorPage)
