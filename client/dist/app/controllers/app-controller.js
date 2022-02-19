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
export class AppController {
    static profile(req, res) {
        res.sendFile('profile.html', {
            root: join(__dirname, '../../client/html')
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
                user.params.strength = strength;
                user.params.defense = defense;
                user.params.resilience = resilience;
                user.params.agility = agility;
                user.warrior = warrior;
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
            res
                .status(200)
                .end();
        });
    }
}
//# sourceMappingURL=app-controller.js.map