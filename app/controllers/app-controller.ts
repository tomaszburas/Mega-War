import {join} from "path";
import {NextFunction, Request, Response} from "express";
import {User} from "../db/models/user";
import {Battle} from "../db/models/battle";
import * as jwt from "jsonwebtoken";
import {ACCESS_TOKEN} from "../config";
import {UserError} from "../midddleware/errors";
import {msToHour, msToMin} from "../utils/ms-to-hour"
import {fight} from "../utils/fight";

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

                if (hours < 3) throw new UserError(`You can make changes one on 3 hours (${msToHour(threeHours-timer)} left)`);
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

            // LAST BATTLE WITH OPPONENT
            const [userBattles] = await Battle
                .find({
                    $and:[
                        {$or: [{winner: req.user.username}, {loser: req.user.username}]},
                        {$or: [{winner: user.username}, {loser: user.username}]},
                    ]

                })
                .sort({_id: -1})
                .limit(1)

            if (userBattles) {
                const timer = Math.abs(Date.now() - userBattles.date);
                const hours = Math.floor(timer / (60*60*1000));
                const oneHour = 3600000;

                if (hours < 1) throw new UserError(`You have already fought a battle with this opponent. Wait ${msToHour(oneHour-timer)} h`);
            }

            // LAST BATTLE
            const [lastBattle] = await Battle
                .find({$or: [{winner: req.user.username}, {loser: req.user.username}]})
                .sort({_id: -1})
                .limit(1)

            if (lastBattle) {
                const timer = Math.abs(Date.now() - lastBattle.date);
                const sec = Math.floor(timer / (1000));

                if (sec < 90) throw new UserError(`You can start the next fight in ${msToMin((90*1000)-timer)} min`);
            }

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
            const battles = await Battle.find({$or: [{winner: req.user.username}, {loser: req.user.username}]}).sort({_id: -1})

            const usersFitToFight: any[] = [];
            users.forEach(user => {
                const fight = battles.find(battle => battle.winner === user.username || battle.loser === user.username);

                if (fight) {
                    const timer = Math.abs(Date.now() - fight.date);
                    const hours = Math.floor(timer / (60*60*1000));
                    if (hours > 1) usersFitToFight.push(user);
                } else {
                    usersFitToFight.push(user);
                }
            })

            if (!usersFitToFight.length) {
                const nearbyUserDate = users
                    .map(user => {
                        const fight = battles.find(battle => battle.winner === user.username || battle.loser === user.username);
                        return fight.date
                    })
                    .sort((a, b) => a - b)[0];

                const timer = Math.abs(Date.now() - nearbyUserDate);
                const hours = Math.floor(timer / (60*60*1000));
                const oneHour = 3600000;

                throw new UserError(`You can start the next fight in ${msToHour(oneHour-timer)} h`)
            }

            // LAST BATTLE
            const [lastBattle] = await Battle
                .find({$or: [{winner: req.user.username}, {loser: req.user.username}]})
                .sort({_id: -1})
                .limit(1)

            if (lastBattle) {
                const timer = Math.abs(Date.now() - lastBattle.date);
                const sec = Math.floor(timer / (1000));

                if (sec < 90) throw new UserError(`You can start the next fight in ${msToMin((90*1000)-timer)} min`);
            }

            const randomIndex = Math.floor(Math.random() * usersFitToFight.length);
            const userData = {
                username: usersFitToFight[randomIndex].username,
                warrior: usersFitToFight[randomIndex].warrior,
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
            const player1 = (await User.find({username: {$eq: req.user.username}}))[0];
            const player2 = (await User.find({username: {$eq: req.body.player2}}))[0];

            const data = fight(player1, player2)

            data.winner === player1.username? player1.wins++ : player1.loses++;
            data.winner === player2.username? player2.wins++ : player2.loses++;

            await player1.save();
            await player2.save();

            const battle = new Battle({
                winner: data.winner,
                loser: data.loser,
            })

            await battle.save();

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
