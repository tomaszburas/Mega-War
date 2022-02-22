import {alertMsgNegative, alertMsgPositive} from "../utils/alert.js";

const startFightBtn = document.querySelector('.start-fight') as HTMLButtonElement;
const fightStatsDiv = document.querySelector('.container__wrapper') as HTMLDivElement;
const fightStatsCloseBtn = document.querySelector('.btn__close') as HTMLButtonElement;
const player1 = document.querySelector('.player1') as HTMLDivElement;
const player1Name = player1.querySelector('.player__name') as HTMLSpanElement;
const player1Img = player1.querySelector('.player__img') as HTMLImageElement;
const player2 = document.querySelector('.player2') as HTMLDivElement;
const player2Name = player2.querySelector('.player__name') as HTMLSpanElement;
const player2Img = player2.querySelector('.player__img') as HTMLImageElement;
const findOpponentBtn = document.querySelector('.btn__find') as HTMLButtonElement;
const findOpponentInput = document.querySelector('.label__input') as HTMLInputElement;
const findOpponentBox = document.querySelector('.arena__opponent') as HTMLDivElement;

let player2Username = '';

// 1 PLAYER INIT
(async() => {
    const res = await fetch('/app/arena/player1')
    const userData = await res.json();

    player1Name.textContent = userData.username;
    player1Img.src = `../img/warriors/right/r-${userData.warrior}.svg`;
})();

// 2 PLAYER INIT
function player2Init(username: string, breed: string): void {
    findOpponentBox.style.display = 'none';
    player2.style.display = 'flex';
    player2Name.textContent = username;
    player2Img.src = `../img/warriors/left/l-${breed}.svg`;
    startFightBtn.style.display = 'flex';
}

async function findOpponent() {
    const res = await fetch('/app/arena/player2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: findOpponentInput.value,
        })
    });

    if (res.status === 200) {
        const data = await res.json();
        player2Username = data.username;
        player2Init(data.username, data.warrior)
    } else {
        const {error} = await res.json();
        typeof error === 'string' ? alertMsgNegative(error) : alertMsgNegative(error[0]);
        findOpponentInput.value = '';
    }
}
findOpponentBtn.addEventListener('click', findOpponent);

// START FIGHT BUTTON
function startFight() {
    fightStatsDiv.style.display = 'flex';
}
startFightBtn.addEventListener('click', startFight);

// FIGHT STATS CLOSE BUTTON
function closeFightStats() {
    fightStatsDiv.style.display = 'none';
    findOpponentBox.style.display = 'flex';
    player2.style.display = 'none';
    findOpponentInput.value = '';
}
fightStatsCloseBtn.addEventListener('click', closeFightStats);

