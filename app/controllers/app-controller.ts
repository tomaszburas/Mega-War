import {join} from "path";
import {NextFunction, Request, Response} from "express";
import {User} from "../db/models/user";
import * as jwt from "jsonwebtoken";
import {ACCESS_TOKEN} from "../config";

export class AppController {
    static profilePage(req: Request, res: Response) {
        res.sendFile('profile.html', {
            root: join(__dirname, '../../client/html')
        })
    }

    static async profile(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findOne({_id: req.user.id})

            const params = {
                strength: user.params.strength,
                defense: user.params.defense,
                resilience: user.params.resilience,
                agility: user.params.agility,
            }

            res
                .status(200)
                .json(params)

        } catch (err) {
            if (err.name === 'ValidationError') {
                err.message = Object.values(err.errors).map((val: any) => val.message);
                next(err)
            } else {
                next(err);
            }
        }
    }

    static configureWarriorPage(req: Request, res: Response) {
        res.sendFile('configurator.html', {
            root: join(__dirname, '../../client/html')
        })
    }

    static async configureWarrior(req: Request, res: Response, next: NextFunction) {
        const {strength, defense, resilience, agility, warrior} = req.body;

        try {
            const user = await User.findOne({_id: req.user.id})

            user.params.strength = strength;
            user.params.defense = defense;
            user.params.resilience = resilience;
            user.params.agility = agility;
            user.warrior = warrior? warrior : user.warrior;

            await user.save();

            const payload = {
                username: user.username,
                id: String(user._id),
                warrior: user.warrior,
            }

            const token = jwt.sign(payload, ACCESS_TOKEN, {expiresIn: "1d"});

            res
                .status(200)
                .cookie(`access_token`, `${token}`, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                })
                .end()

        } catch (err) {
            if (err.name === 'ValidationError') {
                err.message = Object.values(err.errors).map((val: any) => val.message);
                next(err)
            } else {
                next(err);
            }
        }

        // res
        //     .status(200)
        //     .end()
    }
}
