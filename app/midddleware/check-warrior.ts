import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {ACCESS_TOKEN} from "../config";

export function checkNotWarrior(req: Request, res: Response, next: NextFunction) {
    const {access_token} = req.cookies;
    if (access_token) {
        try {
            const decoded = jwt.verify(access_token, ACCESS_TOKEN) as any;
            decoded.warrior? next() : res.redirect('/app/configurator');
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
            decoded.warrior? res.redirect('/app/profile') : next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
}