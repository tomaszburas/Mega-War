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
import { configurePoints, signBuilder } from "../utils/points-configurator.js";
const btn = document.querySelector('.btn');
const warriors = [...document.querySelectorAll('.radio-container')];
const bonusText = document.querySelector('.hero-bonus__text');
const heroImg = [...document.querySelectorAll('.radio-image')];
const heroName = [...document.querySelectorAll('.hero-name')];
const heroInput = [...document.querySelectorAll('.radio-hidden')];
const heroBonusText = {
    aztec: `Aztec: +1S, +1R, +1A`,
    celt: `Celt: +1S, +1D, +1A`,
    chinese: `Chinese: +1D, +1R, +1A`,
    egyptian: `Egyptian: +1S, +1R, +1A`,
    greek: `Greek: +1S, +1D, +1R`,
    indian: `Indian: +1S, +1R, +1A`,
    slavic: `Slavic: +1S, +1D, +1R`,
    viking: `Viking: +1S, +1D, +1R`,
};
configurePoints('aztec', true);
btn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const strength = document.querySelector('.strength');
    const defense = document.querySelector('.defense');
    const resilience = document.querySelector('.resilience');
    const agility = document.querySelector('.agility');
    const warriors = [...document.querySelectorAll('input[name="warrior"]')];
    const warriorName = ['aztec', 'celt', 'chinese', 'egyptian', 'greek', 'indian', 'slavic', 'viking'];
    const total = (+strength.textContent) + (+defense.textContent) + (+resilience.textContent) + (+agility.textContent);
    const warrior = warriors.find(warrior => warrior.getAttribute('checked') === 'true');
    if (total >= 14 || total <= 6 || !warriorName.find(hero => hero === warrior.value)) {
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
warriors.forEach((warrior, i) => {
    warrior.addEventListener('click', (e) => {
        e.preventDefault();
        const warriorName = warrior.getAttribute('data-warrior');
        warriors.forEach((el, index) => {
            if (index === i) {
                heroImg[index].classList.add('radio-image-active');
                heroName[index].classList.add('hero-name-active');
                heroInput[index].setAttribute('checked', 'true');
            }
            else {
                heroImg[index].classList.remove('radio-image-active');
                heroName[index].classList.remove('hero-name-active');
                heroInput[index].setAttribute('checked', 'false');
            }
        });
        signBuilder();
        configurePoints(warriorName, true);
        let text = '';
        for (let txt in heroBonusText) {
            if (txt === warriorName) {
                text = `Bonus for ${heroBonusText[txt]}`;
            }
        }
        bonusText.textContent = text;
    });
});
//# sourceMappingURL=configurator.js.map