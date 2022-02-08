import { join } from "path";
export class AppController {
    static Profile(req, res) {
        res.sendFile('profile.html', {
            root: join(__dirname, '../../client/html/app')
        });
    }
}
//# sourceMappingURL=app-controller.js.map