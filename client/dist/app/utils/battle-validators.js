// import {Battle} from "../db/models/battle";
// import {UserError} from "../midddleware/errors";
// import {msToMin} from "./timer";
// import {Request} from "express";
//
// export async function lastBattle(req: Request): Promise<void> {
//     const [lastBattle] = await Battle
//         .find({$or: [{winner: req.user.username}, {loser: req.user.username}]})
//         .sort({_id: -1})
//         .limit(1)
//
//     if (lastBattle) {
//         const timer = Math.abs(Date.now() - lastBattle.date);
//         const sec = Math.floor(timer / (1000));
//
//         if (sec < 60) throw new UserError(`You can start the next fight in ${msToMin((60*1000)-timer)} sec`);
//     }
// }
//# sourceMappingURL=battle-validators.js.map