import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN } from "../config.js";
export function checkAuth(req, res, next) {
    const { access_token } = req.cookies;
    if (access_token) {
        try {
            const decoded = jwt.verify(access_token, ACCESS_TOKEN);
            req.user = {
                id: decoded.id,
                username: decoded.username,
                nation: decoded.nation,
            };
            next();
        }
        catch (err) {
            res.redirect('/sign-in');
        }
    }
    else {
        res.redirect('/sign-in');
    }
}
export function checkNotAuth(req, res, next) {
    const { access_token } = req.cookies;
    if (access_token) {
        try {
            jwt.verify(access_token, ACCESS_TOKEN);
            res.redirect('/app/profile');
        }
        catch (err) {
            next(err);
        }
    }
    else {
        next();
    }
}
export function getUser(req, res, next) {
    const { access_token } = req.cookies;
    if (access_token) {
        try {
            const decoded = jwt.verify(access_token, ACCESS_TOKEN);
            req.user = {
                id: decoded.id,
                username: decoded.username,
                nation: decoded.nation,
            };
            next();
        }
        catch (err) {
            req.user = null;
            next(err);
        }
    }
    else {
        req.user = null;
        next();
    }
}
//# sourceMappingURL=authorization.js.map