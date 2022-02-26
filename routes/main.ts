import {Router} from "express";
import {MainController} from "../controllers/main-controller.js";
import {checkNotAuth, getUser} from "../midddleware/authorization.js";

export const mainRouter = Router();

mainRouter
    .get('/', MainController.homePage)
    .get('/sign-up', checkNotAuth, MainController.signUpPage)
    .get('/sign-in', checkNotAuth, MainController.signInPage)
    .get('/check-authorization', getUser, MainController.checkAuthorization)
    .get('/logout', MainController.logout)
    .get('/ranking', MainController.rankingPage)
    .get('/get-ranking', MainController.ranking)
    .get('/rules', MainController.rulesPage)
    .get('*', MainController.notFoundPage)

    .post('/sign-up', MainController.signUp)
    .post('/sign-in', MainController.signIn)

