var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Battle } from "../db/models/battle";
import { UserError } from "../midddleware/errors";
import { msToMin } from "./timer";
export function lastBattle(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const [lastBattle] = yield Battle
            .find({ $or: [{ winner: req.user.username }, { loser: req.user.username }] })
            .sort({ _id: -1 })
            .limit(1);
        if (lastBattle) {
            const timer = Math.abs(Date.now() - lastBattle.date);
            const sec = Math.floor(timer / (1000));
            if (sec < 60)
                throw new UserError(`You can start the next fight in ${msToMin((60 * 1000) - timer)} sec`);
        }
    });
}
//# sourceMappingURL=battle-validators.js.map