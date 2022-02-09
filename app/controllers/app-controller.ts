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

    static configureWarrior(req: Request, res: Response) {
        const {strength, defense, resilience, agility} = req.body;

        res
            .status(200)
            .end()
    }
}
