import { Router } from "express";
import { MainController } from "../controllers/main-controller";
import { checkNotAuth, getUser } from "../midddleware/authorization";
export const mainRouter = Router();
mainRouter
    .get('/', MainController.homePage)
    .get('/sign-up', checkNotAuth, MainController.signUpPage)
    .get('/sign-in', checkNotAuth, MainController.signInPage)
    .get('/check-authorization', getUser, MainController.checkAuthorization)
    .get('/logout', MainController.logout)
    .post('/sign-up', MainController.signUp)
    .post('/sign-in', MainController.signIn);
//# sourceMappingURL=main.js.map