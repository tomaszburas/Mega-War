var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { join } from "path";
import { User } from "../db/models/user";
import * as jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../config";
import { UserError } from "../midddleware/errors";
import { msToTime } from "../utils/ms-to-time";
import { fight } from "../utils/fight";
export class AppController {
    static profilePage(req, res) {
        res.sendFile('profile.html', {
            root: join(__dirname, '../../client/html')
        });
    }
    static profileHero(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ _id: req.user.id });
                const userData = {
                    username: user.username,
                    strength: user.params.strength,
                    defense: user.params.defense,
                    resilience: user.params.resilience,
                    agility: user.params.agility,
                    warrior: user.warrior,
                    wins: user.wins,
                    loses: user.loses,
                };
                res
                    .status(200)
                    .json(userData);
            }
            catch (err) {
                if (err.name === 'ValidationError') {
                    err.message = Object.values(err.errors).map((val) => val.message);
                    next(err);
                }
                else {
                    next(err);
                }
            }
        });
    }
    static configureWarriorPage(req, res) {
        res.sendFile('configurator.html', {
            root: join(__dirname, '../../client/html')
        });
    }
    static configureWarrior(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { strength, defense, resilience, agility, warrior } = req.body;
            try {
                const user = yield User.findOne({ _id: req.user.id });
                if (user.params.date) {
                    const timer = Math.abs(Date.now() - user.params.date);
                    const hours = Math.floor(timer / (60 * 60 * 1000));
                    const threeHours = 10800000;
                    if (hours < 3)
                        throw new UserError(`You can make changes one on 3 hours (${msToTime(threeHours - timer)} left)`);
                }
                user.params.strength = strength;
                user.params.defense = defense;
                user.params.resilience = resilience;
                user.params.agility = agility;
                user.params.date = Date.now();
                user.warrior = warrior ? warrior : user.warrior;
                yield user.save();
                const payload = {
                    username: user.username,
                    id: String(user._id),
                    warrior: user.warrior,
                };
                const token = jwt.sign(payload, ACCESS_TOKEN, { expiresIn: "1d" });
                res
                    .status(200)
                    .cookie(`access_token`, `${token}`, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                })
                    .end();
            }
            catch (err) {
                if (err.name === 'ValidationError') {
                    err.message = Object.values(err.errors).map((val) => val.message);
                    next(err);
                }
                else {
                    next(err);
                }
            }
        });
    }
    static arenaPage(req, res) {
        res.sendFile('arena.html', {
            root: join(__dirname, '../../client/html')
        });
    }
    static arenaPlayer1(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ _id: req.user.id });
                const userData = {
                    username: user.username,
                    warrior: user.warrior,
                };
                res
                    .status(200)
                    .json(userData);
            }
            catch (err) {
                if (err.name === 'ValidationError') {
                    err.message = Object.values(err.errors).map((val) => val.message);
                    next(err);
                }
                else {
                    next(err);
                }
            }
        });
    }
    static arenaPlayer2Username(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ username: String(req.body.username) });
                if (!user)
                    throw new UserError('User with the given username does not exist');
                if (req.user.warrior === user.warrior)
                    throw new UserError('You cannot fight an opponent of the same nation');
                const userData = {
                    username: user.username,
                    warrior: user.warrior,
                };
                res
                    .status(200)
                    .json(userData);
            }
            catch (err) {
                if (err.name === 'ValidationError') {
                    err.message = Object.values(err.errors).map((val) => val.message);
                    next(err);
                }
                else {
                    next(err);
                }
            }
        });
    }
    static arenaPlayer2Random(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User.find({ username: { $ne: req.user.username }, warrior: { $ne: req.user.warrior } });
                const randomIndex = Math.floor(Math.random() * users.length);
                const userData = {
                    username: users[randomIndex].username,
                    warrior: users[randomIndex].warrior,
                };
                res
                    .status(200)
                    .json(userData);
            }
            catch (err) {
                if (err.name === 'ValidationError') {
                    err.message = Object.values(err.errors).map((val) => val.message);
                    next(err);
                }
                else {
                    next(err);
                }
            }
        });
    }
    static arenaFight(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const player1 = (yield User.find({ username: { $eq: req.user.username } }))[0];
                const player2 = (yield User.find({ username: { $eq: req.body.player2 } }))[0];
                const data = fight(player1, player2);
                res
                    .status(200)
                    .json(data);
            }
            catch (err) {
                if (err.name === 'ValidationError') {
                    err.message = Object.values(err.errors).map((val) => val.message);
                    next(err);
                }
                else {
                    next(err);
                }
            }
        });
    }
}
//# sourceMappingURL=app-controller.js.map