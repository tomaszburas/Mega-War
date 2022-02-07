import {join} from "path";
import {Request, Response} from "express";

export class MainController {
    static homePage(req: Request, res: Response) {
        res.sendFile('index.html', {
            root: join(__dirname, '../../client')
        })
    }
}
