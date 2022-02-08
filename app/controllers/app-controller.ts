import {join} from "path";
import {Request, Response} from "express";

export class AppController {
    static Profile(req: Request, res: Response) {
        res.sendFile('profile.html', {
            root: join(__dirname, '../../client/html/app')
        })
    }
}
