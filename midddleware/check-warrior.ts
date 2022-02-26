import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {ACCESS_TOKEN} from "../config.js";

export function checkNotWarrior(req: Request, res: Response, next: NextFunction) {
    const {access_token} = req.cookies;
    if (access_token) {
        try {
            const decoded = jwt.verify(access_token, ACCESS_TOKEN) as any;
            decoded.nation? next() : res.redirect('/app/configurator');
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
}

export function checkWarrior(req: Request, res: Response, next: NextFunction) {
    const {access_token} = req.cookies;
    if (access_token) {
        try {
            const decoded = jwt.verify(access_token, ACCESS_TOKEN) as any;
            decoded.nation? res.redirect('/app/profile') : next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
}
