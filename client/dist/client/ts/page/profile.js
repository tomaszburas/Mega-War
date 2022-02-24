var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { alertMsgNegative, alertMsgPositive } from "../utils/alert.js";
import { configurePoints, signBuilder } from "../utils/points-configurator.js";
const username = document.querySelector('.label-username');
const breed = document.querySelector('.label-breed');
const wins = document.querySelector('.label-wins');
const loses = document.querySelector('.label-loses');
const strength = document.querySelector('.strength');
const defense = document.querySelector('.defense');
const resilience = document.querySelector('.resilience');
const agility = document.querySelector('.agility');
const totalPoints = document.querySelector('.max-points');
const warriorImg = document.querySelector('.warrior-img');
const resultsOl = document.querySelector('.results__ol');
(() => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch('/app/profile/hero');
    const userData = yield res.json();
    username.textContent = userData.username;
    breed.textContent = userData.warrior;
    wins.textContent = userData.wins;
    loses.textContent = userData.loses;
    strength.textContent = userData.strength;
    defense.textContent = userData.defense;
    resilience.textContent = userData.resilience;
    agility.textContent = userData.agility;
    warriorImg.src = `../img/warriors/right/r-${userData.warrior}.jpg`;
    const total = 13 - (userData.strength + userData.defense + userData.resilience + userData.agility);
    totalPoints.textContent = `${total}`;
    const btn = document.querySelector('.btn');
    configurePoints(userData.warrior, false);
    // SAVE BUTTON
    btn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const strength = document.querySelector('.strength');
        const defense = document.querySelector('.defense');
        const resilience = document.querySelector('.resilience');
        const agility = document.querySelector('.agility');
        const total = (+strength.textContent) + (+defense.textContent) + (+resilience.textContent) + (+agility.textContent);
        if (total >= 14 || total <= 7) {
            alertMsgNegative('Please don\'t cheat');
        }
        else {
            const res = yield fetch('/app/configurator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    strength: strength.textContent,
                    defense: defense.textContent,
                    resilience: resilience.textContent,
                    agility: agility.textContent,
                })
            });
            if (res.status === 200) {
                alertMsgPositive('Changes saved');
            }
            else {
                const { error } = yield res.json();
                alertMsgNegative(error);
                strength.textContent = userData.strength;
                defense.textContent = userData.defense;
                resilience.textContent = userData.resilience;
                agility.textContent = userData.agility;
                const total = 13 - (userData.strength + userData.defense + userData.resilience + userData.agility);
                totalPoints.textContent = `${total}`;
                signBuilder();
                configurePoints(userData.warrior, false);
            }
        }
    }));
    // RESULTS CONTAINER
    createResults(userData.battleResults);
}))();
function createResults(arr) {
    arr.forEach(el => {
        const li = document.createElement('li');
        li.classList.add('battle__li');
        //LEFT
        const divLeft = document.createElement('div');
        divLeft.classList.add('battle__li__left');
        const spanPlayer1 = document.createElement('span');
        spanPlayer1.classList.add('battle__li-player1');
        spanPlayer1.textContent = el.user;
        const spanVs = document.createElement('span');
        spanVs.classList.add('battle__li-vs');
        spanVs.textContent = ' vs ';
        const spanPlayer2 = document.createElement('span');
        spanPlayer2.classList.add('battle__li-player2');
        spanPlayer2.textContent = el.opponent;
        divLeft.appendChild(spanPlayer1);
        divLeft.appendChild(spanVs);
        divLeft.appendChild(spanPlayer2);
        //CENTER
        const spanDate = document.createElement('span');
        spanDate.classList.add('battle__li-date');
        spanDate.textContent = date(new Date(el.date));
        //RIGHT
        const spanResult = document.createElement('span');
        spanResult.classList.add('battle__li-result');
        if (el.result) {
            spanResult.classList.add('victory');
            spanResult.textContent = `Victory`;
        }
        else {
            spanResult.classList.add('defeat');
            spanResult.textContent = `Defeat`;
        }
        li.appendChild(divLeft);
        li.appendChild(spanDate);
        li.appendChild(spanResult);
        resultsOl.appendChild(li);
    });
}
function date(date) {
    let month;
    let min;
    date.getMonth() + 1 < 10 ? month = `0${date.getMonth() + 1}` : month = `${date.getMonth() + 1}`;
    date.getMinutes() < 10 ? min = `0${date.getMinutes()}` : min = `${date.getMinutes()}`;
    return `${date.getDate()}.${month}.${date.getFullYear()} - ${date.getHours()}:${min}`;
}
//# sourceMappingURL=profile.js.map