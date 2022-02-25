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
import { Battle } from "../db/models/battle";
import * as jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../config";
import { UserError } from "../midddleware/errors";
import { msToHour, msToMin } from "../utils/timer";
import { fight } from "../utils/fight";
import { battleResults } from "../utils/battle-results";
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
                const usersRanking = yield User.find({ nation: { $ne: '' } }).sort({ wins: -1 });
                const index = usersRanking.findIndex(user => {
                    return user.id === req.user.id;
                });
                const battleResultsArr = yield battleResults(req);
                const userData = {
                    username: user.username,
                    strength: user.params.strength,
                    defense: user.params.defense,
                    resilience: user.params.resilience,
                    agility: user.params.agility,
                    nation: user.nation,
                    wins: user.wins,
                    loses: user.loses,
                    battleResults: battleResultsArr,
                    place: index + 1,
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
            const { strength, defense, resilience, agility, nation } = req.body;
            try {
                const user = yield User.findOne({ _id: req.user.id });
                if (user.params.date) {
                    const timer = Math.abs(Date.now() - user.params.date);
                    const hours = Math.floor(timer / (60 * 60 * 1000));
                    const threeHours = 10800000;
                    if (hours < 3)
                        throw new UserError(`You can make changes one on 3 hours (${msToHour(threeHours - timer)} left)`);
                }
                user.params.strength = strength;
                user.params.defense = defense;
                user.params.resilience = resilience;
                user.params.agility = agility;
                user.params.date = Date.now();
                user.nation = nation ? nation : user.nation;
                yield user.save();
                const payload = {
                    username: user.username,
                    id: String(user._id),
                    nation: user.nation,
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
                    nation: user.nation,
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
                if (req.user.nation === user.nation)
                    throw new UserError('You cannot fight an opponent of the same nation');
                // LAST BATTLE WITH OPPONENT
                const [userBattles] = yield Battle
                    .find({
                    $and: [
                        { $or: [{ winner: req.user.username }, { loser: req.user.username }] },
                        { $or: [{ winner: user.username }, { loser: user.username }] },
                    ]
                })
                    .sort({ _id: -1 })
                    .limit(1);
                if (userBattles) {
                    const timer = Math.abs(Date.now() - userBattles.date);
                    const hours = Math.floor(timer / (60 * 60 * 1000));
                    const oneHour = 3600000;
                    if (hours < 1)
                        throw new UserError(`You have already fought a battle with this opponent. Wait ${msToHour(oneHour - timer)} h`);
                }
                // LAST BATTLE
                const [lastBattle] = yield Battle
                    .find({ $or: [{ winner: req.user.username }, { loser: req.user.username }] })
                    .sort({ _id: -1 })
                    .limit(1);
                if (lastBattle) {
                    const timer = Math.abs(Date.now() - lastBattle.date);
                    const sec = Math.floor(timer / (1000));
                    if (sec < 60)
                        throw new UserError(`You can start the next fight in ${msToMin((60 * 1000) - timer)} min`);
                }
                const userData = {
                    username: user.username,
                    nation: user.nation,
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
                const users = yield User.find({ username: { $ne: req.user.username }, nation: { $ne: req.user.nation } });
                const battles = yield Battle.find({ $or: [{ winner: req.user.username }, { loser: req.user.username }] }).sort({ _id: -1 });
                // LAST BATTLE WITH THIS SAME USER
                const usersFitToFight = [];
                users.forEach(user => {
                    const fight = battles.find(battle => battle.winner === user.username || battle.loser === user.username);
                    if (fight) {
                        const timer = Math.abs(Date.now() - fight.date);
                        const hours = Math.floor(timer / (60 * 60 * 1000));
                        if (hours >= 1)
                            usersFitToFight.push(user);
                    }
                    else {
                        usersFitToFight.push(user);
                    }
                });
                if (!usersFitToFight.length) {
                    const nearbyUserDate = users
                        .map(user => {
                        const fight = battles.find(battle => battle.winner === user.username || battle.loser === user.username);
                        return fight.date;
                    })
                        .sort((a, b) => a - b)[0];
                    const timer = Math.abs(Date.now() - nearbyUserDate);
                    const hour = 3600000;
                    throw new UserError(`You can start the next fight in ${msToHour(hour - timer)} h`);
                }
                // LAST BATTLE
                if (battles[0]) {
                    const timer = Math.abs(Date.now() - battles[0].date);
                    const sec = Math.floor(timer / (1000));
                    if (sec < 60)
                        throw new UserError(`You can start the next fight in ${msToMin((60 * 1000) - timer)} min`);
                }
                const randomIndex = Math.floor(Math.random() * usersFitToFight.length);
                const userData = {
                    username: usersFitToFight[randomIndex].username,
                    nation: usersFitToFight[randomIndex].nation,
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
    static arena(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const player1 = (yield User.find({ username: { $eq: req.user.username } }))[0];
                const player2 = (yield User.find({ username: { $eq: req.body.player2 } }))[0];
                const data = fight(player1, player2);
                data.winner === player1.username ? player1.wins++ : player1.loses++;
                data.winner === player2.username ? player2.wins++ : player2.loses++;
                yield player1.save();
                yield player2.save();
                const battle = new Battle({
                    winner: data.winner,
                    loser: data.loser,
                    date: new Date(),
                });
                yield battle.save();
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