const startFightBtn = document.querySelector('.start-fight');
const fightStatsDiv = document.querySelector('.container__wrapper');
const fightStatsCloseBtn = document.querySelector('.btn__close');
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
export {};
//# sourceMappingURL=arena.js.map