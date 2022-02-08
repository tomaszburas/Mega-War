import {join} from "path";
import {Request, Response} from "express";

export class MainController {
    static homePage(req: Request, res: Response) {
        res.sendFile('index.html', {
            root: join(__dirname, '../../client')
        })
    }

    static signUp(req: Request, res: Response) {
        res.sendFile('sign-up.html', {
            root: join(__dirname, '../../client/html')
        })
    }
}
