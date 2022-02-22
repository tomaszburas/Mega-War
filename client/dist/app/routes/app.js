import { Router } from "express";
import { AppController } from "../controllers/app-controller";
import { checkAuth } from "../midddleware/authorization";
import { checkNotWarrior, checkWarrior } from "../midddleware/check-warrior";
export const appRouter = Router();
appRouter.use(checkAuth);
appRouter
    .get('/profile', checkNotWarrior, AppController.profilePage)
    .get('/configurator', checkWarrior, AppController.configureWarriorPage)
    .get('/arena', checkNotWarrior, AppController.arenaPage)
    .get('/arena/player1', checkNotWarrior, AppController.arenaPlayer1)
    .get('/profile/hero', AppController.profileHero)
    .post('/configurator', AppController.configureWarrior)
    .post('/arena/player2', AppController.arenaPlayer2);
//# sourceMappingURL=app.js.map