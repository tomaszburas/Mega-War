import {join} from "path";
import {NextFunction, Request, Response} from "express";
import {User} from "../db/models/user";
import * as jwt from "jsonwebtoken";
import {ACCESS_TOKEN} from "../config";
import {UserError} from "../midddleware/errors";
import {msToTime} from "../utils/ms-to-time"
import {fight, Warrior} from "../utils/fight";

export class AppController {
    static profilePage(req: Request, res: Response) {
        res.sendFile('profile.html', {
            root: join(__dirname, '../../client/html')
        })
    }

    static async profileHero(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findOne({_id: req.user.id})

            const userData = {
                username: user.username,
                strength: user.params.strength,
                defense: user.params.defense,
                resilience: user.params.resilience,
                agility: user.params.agility,
                warrior: user.warrior,
                wins: user.wins,
                loses: user.loses,
            }

            res
                .status(200)
                .json(userData)

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

            if (user.params.date) {
                const timer = Math.abs(Date.now() - user.params.date);
                const hours = Math.floor(timer / (60*60*1000));
                const threeHours = 10800000;

                if (hours < 3) throw new UserError(`You can make changes one on 3 hours (${msToTime(threeHours-timer)} left)`);
            }

            user.params.strength = strength;
            user.params.defense = defense;
            user.params.resilience = resilience;
            user.params.agility = agility;
            user.params.date = Date.now()
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
    }

    static arenaPage(req: Request, res: Response) {
        res.sendFile('arena.html', {
            root: join(__dirname, '../../client/html')
        })
    }

    static async arenaPlayer1(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findOne({_id: req.user.id})

            const userData = {
                username: user.username,
                warrior: user.warrior,
            }

            res
                .status(200)
                .json(userData)

        } catch (err) {
            if (err.name === 'ValidationError') {
                err.message = Object.values(err.errors).map((val: any) => val.message);
                next(err)
            } else {
                next(err);
            }
        }
    }

    static async arenaPlayer2Username(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findOne({username: String(req.body.username)})
            if (!user) throw new UserError('User with the given username does not exist')

            if (req.user.warrior === user.warrior) throw new UserError('You cannot fight an opponent of the same nation')

            const userData = {
                username: user.username,
                warrior: user.warrior,
            }

            res
                .status(200)
                .json(userData)

        } catch (err) {
            if (err.name === 'ValidationError') {
                err.message = Object.values(err.errors).map((val: any) => val.message);
                next(err)
            } else {
                next(err);
            }
        }
    }

    static async arenaPlayer2Random(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await User.find({username: {$ne: req.user.username}, warrior: {$ne: req.user.warrior}});

            const randomIndex = Math.floor(Math.random() * users.length);
            const userData = {
                username: users[randomIndex].username,
                warrior: users[randomIndex].warrior,
            }
            res
                .status(200)
                .json(userData)

        } catch (err) {
            if (err.name === 'ValidationError') {
                err.message = Object.values(err.errors).map((val: any) => val.message);
                next(err)
            } else {
                next(err);
            }
        }
    }

    static async arenaFight(req: Request, res: Response, next: NextFunction) {
        try {
            const player1 = (await User.find({username: {$eq: req.user.username}}))[0] as Warrior;
            const player2 = (await User.find({username: {$eq: req.body.player2}}))[0] as Warrior;

            const data = fight(player1, player2)

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
}
