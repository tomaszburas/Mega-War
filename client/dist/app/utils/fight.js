export function fight(player1, player2) {
    const starting = Math.floor(Math.random() * 2) + 1;
    let attacker;
    let defender;
    const resultsLog = [];
    let winner;
    let loser;
    if (starting === 1) {
        attacker = player1;
        defender = player2;
    }
    else {
        attacker = player2;
        defender = player1;
    }
    attacker.hp = attacker.params.resilience * 10;
    attacker.dp = attacker.params.defense;
    defender.hp = defender.params.resilience * 10;
    defender.dp = defender.params.defense;
    while (attacker.hp > 0 && defender.hp > 0) {
        resultsLog.push(fightSchema(attacker, defender));
        if (defender.hp > 0) {
            resultsLog.push(fightSchema(defender, attacker));
        }
    }
    if (attacker.hp > 0) {
        winner = attacker;
        loser = defender;
    }
    else {
        winner = defender;
        loser = attacker;
    }
    resultsLog[resultsLog.length - 1] = `<b>${winner.username}</b> dealt ${winner.params.strength} damage. <b>${loser.username}</b> died ☠`;
    return {
        winner: winner.username,
        winnerNation: winner.warrior,
        loser: loser.username,
        resultsLog,
    };
}
function fightSchema(attacker, defender) {
    let text = '';
    if (attacker.params.strength < defender.params.agility + defender.dp) {
        if (attacker.params.strength > defender.dp) {
            defender.dp = defender.dp - attacker.params.strength;
            defender.hp = defender.hp + defender.dp;
            text = `<b>${attacker.username}</b> dealt ${attacker.params.strength} damage. <b>${defender.username}</b> has ${defender.hp} hp left`;
            defender.dp = 0;
        }
        else {
            defender.dp = defender.dp - attacker.params.strength;
            if (defender.dp) {
                text = `<b>${attacker.username}</b> dealt ${attacker.params.strength} damage. <b>${defender.username}</b> has ${defender.hp} hp and ${defender.dp} dp left`;
            }
            else {
                text = `<b>${attacker.username}</b> dealt ${attacker.params.strength} damage. <b>${defender.username}</b> has ${defender.hp} hp`;
            }
        }
    }
    else {
        defender.hp = defender.hp - attacker.params.strength;
        text = `<b>${attacker.username}</b> dealt ${attacker.params.strength} damage. <b>${defender.username}</b> has ${defender.hp} hp left`;
    }
    return text;
}
//# sourceMappingURL=fight.js.map