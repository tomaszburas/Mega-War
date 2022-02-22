import {alertMsgNegative, alertMsgPositive} from "../utils/alert.js";

const startFightBtn = document.querySelector('.start-fight') as HTMLButtonElement;
const fightStatsDiv = document.querySelector('.container__wrapper') as HTMLDivElement;
const fightStatsCloseBtn = document.querySelector('.btn__close') as HTMLButtonElement;


// 1 PLAYER INIT


// START FIGHT BUTTON
function startFight() {
    fightStatsDiv.style.display = 'flex';
}
startFightBtn.addEventListener('click', startFight);

// FIGHT STATS CLOSE BUTTON
function closeFightStats() {
    fightStatsDiv.style.display = 'none';
}
fightStatsCloseBtn.addEventListener('click', closeFightStats);

