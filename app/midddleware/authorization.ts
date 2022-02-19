import * as jwt from 'jsonwebtoken';
import {ACCESS_TOKEN} from "../config";
import {NextFunction, Request, Response} from "express";

declare module "express" {
    export interface Request {
        user: any
    }
}

export function checkAuth(req: Request, res: Response, next: NextFunction) {
    const {access_token} = req.cookies;
    if (access_token) {
        try {
            const decoded = jwt.verify(access_token, ACCESS_TOKEN) as any;
            req.user = {
                id: decoded.id,
                username: decoded.username,
            };
            next();
        } catch (err) {
            res.redirect('/sign-in');
        }
    } else {
        res.redirect('/sign-in');
    }
}

export function checkNotAuth(req: Request, res: Response, next: NextFunction) {
    const {access_token} = req.cookies;
    if (access_token) {
        try {
            jwt.verify(access_token, ACCESS_TOKEN);
            res.redirect('/app/profile');
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
}

export function getUser(req: Request, res: Response, next: NextFunction) {
    const {access_token} = req.cookies;
    if (access_token) {
        try {
            const decoded = jwt.verify(access_token, ACCESS_TOKEN) as any;
            req.user = {
                id: decoded.id,
                username: decoded.username,
            };
            next();
        } catch (err) {
            req.user = null;
            next(err);
        }
    } else {
        req.user = null;
        next();
    }
}

