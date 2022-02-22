import {Router} from "express";
import {AppController} from "../controllers/app-controller";
import {checkAuth} from "../midddleware/authorization";
import {checkNotWarrior, checkWarrior} from "../midddleware/check-warrior";

export const appRouter = Router();

appRouter.use(checkAuth)

appRouter
    .get('/profile', checkNotWarrior, AppController.profilePage)
    .get('/configurator', checkWarrior, AppController.configureWarriorPage)
    .get('/arena', checkNotWarrior, AppController.arenaPage)

    .post('/profile', AppController.profile)
    .post('/configurator', AppController.configureWarrior)
