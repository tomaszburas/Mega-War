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
import { configurePoints } from "../utils/points-configurator.js";
const username = document.querySelector('.container__title');
const breed = document.querySelector('.label-breed');
const wins = document.querySelector('.label-wins');
const loses = document.querySelector('.label-loses');
const strength = document.querySelector('.strength');
const defense = document.querySelector('.defense');
const resilience = document.querySelector('.resilience');
const agility = document.querySelector('.agility');
const totalPoints = document.querySelector('.max-points');
const warriorImg = document.querySelector('.warrior-img');
(() => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch('/app/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
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
    const total = 10 - (userData.strength + userData.defense + userData.resilience + userData.agility);
    totalPoints.textContent = `${total}`;
    configurePoints();
    const btn = document.querySelector('.btn');
    btn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const strength = document.querySelector('.strength');
        const defense = document.querySelector('.defense');
        const resilience = document.querySelector('.resilience');
        const agility = document.querySelector('.agility');
        const total = (+strength.textContent) + (+defense.textContent) + (+resilience.textContent) + (+agility.textContent);
        if (total >= 11 || total <= 3) {
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
                const total = 10 - (userData.strength + userData.defense + userData.resilience + userData.agility);
                totalPoints.textContent = `${total}`;
                configurePoints();
            }
        }
    }));
}))();
//# sourceMappingURL=profile.js.map