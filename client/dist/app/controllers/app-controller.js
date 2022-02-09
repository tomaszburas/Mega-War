import { join } from "path";
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
}
//# sourceMappingURL=app-controller.js.map