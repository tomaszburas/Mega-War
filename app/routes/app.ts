import {Router} from "express";
import {AppController} from "../controllers/app-controller";
import {checkAuth} from "../midddleware/authorization";
import {checkNotWarrior, checkWarrior} from "../midddleware/check-warrior";

export const appRouter = Router();

appRouter.use(checkAuth)

appRouter
    .get('/profile', checkNotWarrior, AppController.profile)
    .get('/configurator', checkWarrior, AppController.configureWarriorPage)

    .post('/configurator', AppController.configureWarrior)
