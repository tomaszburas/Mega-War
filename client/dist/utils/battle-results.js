var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Battle } from "../db/models/battle.js";
export function battleResults(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const battles = yield Battle.find({ $or: [{ winner: req.user.username }, { loser: req.user.username }] }).sort({ _id: -1 }).limit(30);
        const battleResultsArray = [];
        battles.forEach(battle => {
            if (battle.winner === req.user.username) {
                battleResultsArray.push({
                    user: req.user.username,
                    opponent: battle.loser,
                    date: battle.date,
                    result: true,
                });
            }
            else {
                battleResultsArray.push({
                    user: req.user.username,
                    opponent: battle.winner,
                    date: battle.date,
                    result: false,
                });
            }
        });
        return battleResultsArray;
    });
}
//# sourceMappingURL=battle-results.js.map