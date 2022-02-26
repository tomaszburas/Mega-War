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
import jwt from "jsonwebtoken";
import { User } from "../db/models/user.js";
import { ACCESS_TOKEN } from "../config.js";
import { UserError } from "../midddleware/errors.js";
import { validatePassword } from "../utils/validators.js";
import { __dirname } from "../server.js";
export class MainController {
    static homePage(req, res) {
        res.sendFile('index.html', {
            root: join(__dirname, '../../client')
        });
    }
    static signUpPage(req, res) {
        res.sendFile('sign-up.html', {
            root: join(__dirname, '../../client/html')
        });
    }
    static signInPage(req, res) {
        res.sendFile('sign-in.html', {
            root: join(__dirname, '../../client/html')
        });
    }
    static signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                if (!validatePassword(password))
                    throw new UserError('Password must contains minimum 5 characters, at least one letter and one number');
                const newUser = new User({
                    username: String(username),
                    password: String(password),
                });
                yield newUser.save();
                res
                    .status(200)
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
    static signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ username: String(req.body.username) });
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
                };
                const token = jwt.sign(payload, ACCESS_TOKEN, { expiresIn: "1d" });
                if (user.warrior) {
                    res.status(200);
                }
                else {
                    res.status(301);
                }
                res
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
    static logout(req, res) {
        res
            .clearCookie('access_token')
            .redirect('/sign-in');
    }
    static checkAuthorization(req, res) {
        res.json(req.user);
    }
    static notFoundPage(req, res) {
        res
            .status(404)
            .sendFile('404.html', {
            root: join(__dirname, '../../client/html')
        });
    }
    static rankingPage(req, res) {
        res.sendFile('ranking.html', {
            root: join(__dirname, '../../client/html')
        });
    }
    static ranking(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User.find({ nation: { $ne: '' } }).sort({ wins: -1 });
                const data = users.map((user, i) => {
                    return {
                        place: i + 1,
                        username: user.username,
                        nation: user.nation,
                        wins: user.wins,
                        defeats: user.loses,
                    };
                });
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
    static rulesPage(req, res) {
        res.sendFile('rules.html', {
            root: join(__dirname, '../../client/html')
        });
    }
}
//# sourceMappingURL=main-controller.js.map