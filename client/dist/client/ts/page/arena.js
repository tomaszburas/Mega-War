var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { alertMsgNegative } from "../utils/alert.js";
const startFightBtn = document.querySelector('.start-fight');
const fightStatsDiv = document.querySelector('.container__wrapper');
const fightStatsCloseBtn = document.querySelector('.btn__close');
const player1 = document.querySelector('.player1');
const player1Name = player1.querySelector('.player__name');
const player1Img = player1.querySelector('.player__img');
const player2 = document.querySelector('.player2');
const player2Name = player2.querySelector('.player__name');
const player2Img = player2.querySelector('.player__img');
const findOpponentBtn = document.querySelector('.btn__find');
const findOpponentInput = document.querySelector('.label__input');
const findOpponentBox = document.querySelector('.arena__opponent');
const findOpponentBtnRandom = document.querySelector('.random-opponent');
const resultUsername = document.querySelector('.results__username');
const resultBreed = document.querySelector('.results__breed');
const resultImg = document.querySelector('.results__img');
const resultOl = document.querySelector('.fight-ol');
let player2Username = '';
// 1 PLAYER INIT
(() => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch('/app/arena/player1');
    const userData = yield res.json();
    player1Name.textContent = userData.username;
    player1Img.src = `../img/warriors/right/r-${userData.warrior}.svg`;
}))();
// 2 PLAYER INIT USERNAME
function player2Init(username, breed) {
    findOpponentBox.style.display = 'none';
    player2.style.display = 'flex';
    player2Name.textContent = username;
    player2Img.src = `../img/warriors/left/l-${breed}.svg`;
    startFightBtn.style.display = 'flex';
}
function findOpponent() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch('/app/arena/player2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: findOpponentInput.value,
            })
        });
        if (res.status === 200) {
            const data = yield res.json();
            player2Username = data.username;
            player2Init(data.username, data.warrior);
        }
        else {
            const { error } = yield res.json();
            typeof error === 'string' ? alertMsgNegative(error) : alertMsgNegative(error[0]);
            findOpponentInput.value = '';
        }
    });
}
findOpponentBtn.addEventListener('click', findOpponent);
// 2 PLAYER INIT RANDOM
function findOpponentRandom() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch('/app/arena/player2-random');
        if (res.status === 200) {
            const data = yield res.json();
            player2Username = data.username;
            player2Init(data.username, data.warrior);
        }
        else {
            const { error } = yield res.json();
            typeof error === 'string' ? alertMsgNegative(error) : alertMsgNegative(error[0]);
        }
    });
}
findOpponentBtnRandom.addEventListener('click', findOpponentRandom);
// START FIGHT BUTTON
function startFight() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch('/app/arena/fight', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                player2: player2Username,
            })
        });
        if (res.status === 200) {
            const data = yield res.json();
            resultUsername.textContent = data.winner;
            resultBreed.textContent = data.winnerNation;
            resultImg.src = `../img/warriors/right/r-${data.winnerNation}.jpg`;
            data.resultsLog.forEach((result) => {
                const li = document.createElement('li');
                li.classList.add('fight-text');
                li.innerHTML = result;
                resultOl.appendChild(li);
            });
        }
        else {
            const { error } = yield res.json();
            typeof error === 'string' ? alertMsgNegative(error) : alertMsgNegative(error[0]);
            findOpponentInput.value = '';
        }
        fightStatsDiv.style.display = 'flex';
    });
}
startFightBtn.addEventListener('click', startFight);
// FIGHT STATS CLOSE BUTTON
function closeFightStats() {
    fightStatsDiv.style.display = 'none';
    findOpponentBox.style.display = 'flex';
    player2.style.display = 'none';
    findOpponentInput.value = '';
    startFightBtn.style.display = 'none';
    resultOl.textContent = '';
}
fightStatsCloseBtn.addEventListener('click', closeFightStats);
//# sourceMappingURL=arena.js.map