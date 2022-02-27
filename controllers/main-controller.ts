import {join} from "path";
import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

import {User} from "../db/models/user.js";
import {ACCESS_TOKEN} from "../config.js";
import {UserError} from "../midddleware/errors.js";
import {validatePassword} from "../utils/validators.js";
import {__dirname} from "../server.js"

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
            if (!validatePassword(password)) throw new UserError('Password must contains minimum 5 characters, at least one letter and one number')

            const newUser = new User({
                username: String(username),
                password: String(password),
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
            const user = await User.findOne({ username: String(req.body.username) });
            if (!user) {
                throw new UserError('User not found');
            }

            const isValidPassword = user.comparePassword(String(req.body.password));
            if (!isValidPassword) {
                throw new UserError('Password not valid');
            }

            const payload = {
                username: user.username,
                id: String(user._id),
                nation: user.nation,
            }

            const token = jwt.sign(payload, ACCESS_TOKEN, {expiresIn: "1d"});

            if (user.nation) {
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

    static rankingPage(req: Request, res: Response) {
        res.sendFile('ranking.html', {
            root: join(__dirname, '../../client/html')
        })
    }

    static async ranking(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await User.find({nation: {$ne: ''}}).sort({wins: -1})

            const data = users.map((user, i) => {
                return {
                    place: i+1,
                    username: user.username,
                    nation: user.nation,
                    wins: user.wins,
                    defeats: user.loses,
                }
            })

            res
                .status(200)
                .json(data)

        } catch (err) {
            if (err.name === 'ValidationError') {
                err.message = Object.values(err.errors).map((val: any) => val.message);
                next(err)
            } else {
                next(err);
            }
        }
    }

    static rulesPage(req: Request, res: Response) {
        res.sendFile('rules.html', {
            root: join(__dirname, '../../client/html')
        })
    }
}
