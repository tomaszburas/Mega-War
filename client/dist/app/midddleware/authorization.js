import * as jwt from 'jsonwebtoken';
import { ACCESS_TOKEN } from "../config";
export function checkAuth(req, res, next) {
    const { access_token } = req.cookies;
    if (access_token) {
        try {
            const decoded = jwt.verify(access_token, ACCESS_TOKEN);
            req.user = {
                id: decoded.id,
                username: decoded.username,
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
            next();
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
            };
            next();
        }
        catch (err) {
            req.user = null;
            next();
        }
    }
    else {
        req.user = null;
        next();
    }
}
//# sourceMappingURL=authorization.js.map