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
const totals = [...document.querySelectorAll(".range-value")];
const plus = [...document.querySelectorAll(".plus__btn")];
const minus = [...document.querySelectorAll(".minus__btn")];
const pointValue = document.querySelector(".max-points");
const warriorName = ['aztec', 'celt', 'chinese', 'egyptian', 'greek', 'indian', 'slavic', 'viking'];
const btn = document.querySelector('.btn');
totals.forEach((total, i) => {
    minus[i].style.visibility = "hidden";
    minus[i].addEventListener('click', decPoints(total, i));
    plus[i].addEventListener('click', incPoints(total, i));
});
function incPoints(total, i) {
    return function listener() {
        let val = Number(total.textContent);
        val = val + 1;
        total.textContent = `${val}`;
        let points = pointsCounter(totals, 10);
        pointValue.textContent = `${points}`;
        if (points === 0) {
            plus.forEach(val => {
                val.style.visibility = 'hidden';
            });
        }
        if (+total.textContent <= 5)
            minus[i].style.visibility = 'visible';
        if (+total.textContent === 1)
            minus[i].style.visibility = 'hidden';
    };
}
function decPoints(total, i) {
    return function listener() {
        let val = Number(total.textContent);
        val = val - 1;
        total.textContent = `${val}`;
        let points = pointsCounter(totals, 10);
        pointValue.textContent = `${points}`;
        if (points === 6) {
            minus.forEach(val => {
                val.style.visibility = 'hidden';
            });
        }
        if (+total.textContent === 1)
            minus[i].style.visibility = 'hidden';
        if (+total.textContent >= 1) {
            plus.forEach(val => {
                val.style.visibility = 'visible';
            });
        }
    };
}
function pointsCounter(totals, points) {
    totals.forEach((total) => {
        points -= Number(total.textContent);
    });
    return points;
}
btn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const strength = document.querySelector('.strength');
    const defense = document.querySelector('.defense');
    const resilience = document.querySelector('.resilience');
    const agility = document.querySelector('.agility');
    const warriors = [...document.querySelectorAll('input[name="warrior"]')];
    const total = (+strength.textContent) + (+defense.textContent) + (+resilience.textContent) + (+agility.textContent);
    const warrior = warriors.find(warrior => warrior.checked);
    if (total >= 11 || total <= 3 || !warriorName.find(hero => hero === warrior.value)) {
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
                warrior: warrior.value,
            })
        });
        if (res.status === 200) {
            window.location.href = '/app/profile';
        }
    }
}));
//# sourceMappingURL=configurator.js.map