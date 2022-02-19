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
import { configurePoints } from "../utils/points-configurator.js";
configurePoints();
const btn = document.querySelector('.btn');
btn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const strength = document.querySelector('.strength');
    const defense = document.querySelector('.defense');
    const resilience = document.querySelector('.resilience');
    const agility = document.querySelector('.agility');
    const warriors = [...document.querySelectorAll('input[name="warrior"]')];
    const warriorName = ['aztec', 'celt', 'chinese', 'egyptian', 'greek', 'indian', 'slavic', 'viking'];
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