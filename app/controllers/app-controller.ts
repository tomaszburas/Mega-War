import {join} from "path";
import {Request, Response} from "express";

export class AppController {
    static profile(req: Request, res: Response) {
        res.sendFile('profile.html', {
            root: join(__dirname, '../../client/html')
        })
    }

    static configureWarriorPage(req: Request, res: Response) {
        res.sendFile('configurator.html', {
            root: join(__dirname, '../../client/html')
        })
    }
}
