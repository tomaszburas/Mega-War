import {alertMsgNegative, alertMsgPositive} from "../utils/alert.js";
import {configurePoints} from "../utils/points-configurator.js";

const strength = document.querySelector('.strength');
const defense = document.querySelector('.defense');
const resilience = document.querySelector('.resilience');
const agility = document.querySelector('.agility');
const totalPoints = document.querySelector('.max-points');
const warriorImg = document.querySelector('.warrior-img') as HTMLImageElement;

(async () => {
    const res = await fetch('/app/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const userData = await res.json();

    strength.textContent = userData.strength;
    defense.textContent = userData.defense;
    resilience.textContent = userData.resilience;
    agility.textContent = userData.agility;

    warriorImg.src = `../img/warriors/right/r-${userData.warrior}.svg`;

    const total = 10 - (userData.strength + userData.defense + userData.resilience + userData.agility);
    totalPoints.textContent = `${total}`;

    configurePoints();

    const btn = document.querySelector('.btn');

    btn.addEventListener('click', async () => {
        const strength = document.querySelector('.strength');
        const defense = document.querySelector('.defense');
        const resilience = document.querySelector('.resilience');
        const agility = document.querySelector('.agility');

        const total = (+strength.textContent) + (+defense.textContent) + (+resilience.textContent) + (+agility.textContent);

        if (total >= 11 || total <= 3) {
            alertMsgNegative('Please don\'t cheat');
        } else {
            const res = await fetch('/app/configurator', {
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
            })
            if (res.status === 200) {
                alertMsgPositive('Changes saved');
            }
        }
    })
})();

