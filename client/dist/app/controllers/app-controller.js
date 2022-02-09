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
    static configureWarrior(req, res) {
        const { strength, defense, resilience, agility } = req.body;
        res
            .status(200)
            .end();
    }
}
//# sourceMappingURL=app-controller.js.map