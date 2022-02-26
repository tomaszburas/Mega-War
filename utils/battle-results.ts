import {Request} from "express";
import {Battle} from "../db/models/battle.js";
import {Results} from "../ts/interfaces/Results.js";

export async function battleResults(req: Request): Promise<Results[]> {
    const battles = await Battle.find({$or: [{winner: req.user.username}, {loser: req.user.username}]}).sort({_id: -1}).limit(30);
    const battleResultsArray: Results[] = [];

    battles.forEach(battle => {
        if(battle.winner === req.user.username) {
            battleResultsArray.push({
                user: req.user.username,
                opponent: battle.loser,
                date: battle.date,
                result: true,
            })
        } else {
            battleResultsArray.push({
                user: req.user.username,
                opponent: battle.winner,
                date: battle.date,
                result: false,
            })
        }
    })

    return battleResultsArray;
}
