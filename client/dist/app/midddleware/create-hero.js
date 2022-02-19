import * as jwt from 'jsonwebtoken';
import { ACCESS_TOKEN } from "../config";
export function createHero(req, res, next) {
    const { access_token } = req.cookies;
    if (access_token) {
        try {
            const decoded = jwt.verify(access_token, ACCESS_TOKEN);
            decoded.warrior ? next() : res.redirect('/app/configurator');
        }
        catch (err) {
            next();
        }
    }
    else {
        next();
    }
}
//# sourceMappingURL=create-hero.js.map