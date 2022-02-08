import { Router } from "express";
import { MainController } from "../controllers/main-controller";
export const mainRouter = Router();
mainRouter
    .get('/', MainController.homePage)
    .get('/sign-up', MainController.signUpPage)
    .get('/sign-in', MainController.signInPage)
    .post('/sign-up', MainController.signUp)
    .post('/sign-in', MainController.signIn);
//# sourceMappingURL=main.js.map