import {join} from "path";
import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";

import {User} from "../db/models/user";
import {ACCESS_TOKEN} from "../config";
import {UserError} from "../utils/errors";

export class MainController {
    static homePage(req: Request, res: Response) {
        res.sendFile('index.html', {
            root: join(__dirname, '../../client')
        })
    }

    static signUpPage(req: Request, res: Response) {
        res.sendFile('sign-up.html', {
            root: join(__dirname, '../../client/html')
        })
    }

    static signInPage(req: Request, res: Response) {
        res.sendFile('sign-in.html', {
            root: join(__dirname, '../../client/html')
        })
    }

    static async signUp(req: Request, res: Response, next: NextFunction) {
        const {username, password} = req.body;

        try {
            const newUser = new User({
                username: username,
                password: password,
            });

            await newUser.save();
            res
                .status(200)
                .end()
        } catch (err) {
            if (err.name === 'ValidationError') {
                err.message = Object.values(err.errors).map((val: any) => val.message);
                next(err)
            } else {
                next(err);
            }
        }
    }

    static async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                throw new UserError('User not found');
            }

            const isValidPassword = user.comparePassword(req.body.password);
            if (!isValidPassword) {
                throw new UserError('Password not valid');
            }

            const payload = {
                username: user.username,
                id: String(user._id),
                warrior: user.warrior,
            }

            const token = jwt.sign(payload, ACCESS_TOKEN, {expiresIn: "1d"});

            if (user.warrior) {
                res.status(200)
            } else {
                res.status(301)
            }

            res
                .cookie(`access_token`, `${token}`, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            })
                .end();
        } catch (err) {
            if (err.name === 'ValidationError') {
                err.message = Object.values(err.errors).map((val: any) => val.message);
                next(err)
            } else {
                next(err);
            }
        }
    }

    static logout(req: Request, res: Response) {
        res
            .clearCookie('access_token')
            .redirect('/sign-in')
    }

    static checkAuthorization(req: Request, res: Response) {
        res.json(req.user)
    }

    static notFoundPage(req: Request, res: Response) {
        res
            .status(404)
            .sendFile('404.html', {
                root: join(__dirname, '../../client/html')
            })
    }
}
