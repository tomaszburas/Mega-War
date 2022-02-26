import { Router } from "express";
import { AppController } from "../controllers/app-controller.js";
import { checkAuth } from "../midddleware/authorization.js";
import { checkNotWarrior, checkWarrior } from "../midddleware/check-warrior.js";
export const appRouter = Router();
appRouter.use(checkAuth);
appRouter
    .get('/profile', checkNotWarrior, AppController.profilePage)
    .get('/configurator', checkWarrior, AppController.configureWarriorPage)
    .get('/arena', checkNotWarrior, AppController.arenaPage)
    .get('/arena/player1', checkNotWarrior, AppController.arenaPlayer1)
    .get('/profile/hero', checkNotWarrior, AppController.profileHero)
    .get('/arena/player2-random', checkNotWarrior, AppController.arenaPlayer2Random)
    .post('/configurator', AppController.configureWarrior)
    .post('/arena/player2', AppController.arenaPlayer2Username)
    .post('/arena/fight', AppController.arena);
//# sourceMappingURL=app.js.map