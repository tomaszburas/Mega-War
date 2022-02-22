import {alertMsgNegative, alertMsgPositive} from "../utils/alert.js";
import {configurePoints, signBuilder} from "../utils/points-configurator.js";

const username = document.querySelector('.label-username');
const breed = document.querySelector('.label-breed');
const wins = document.querySelector('.label-wins');
const loses = document.querySelector('.label-loses');
const strength = document.querySelector('.strength');
const defense = document.querySelector('.defense');
const resilience = document.querySelector('.resilience');
const agility = document.querySelector('.agility');
const totalPoints = document.querySelector('.max-points');
const warriorImg = document.querySelector('.warrior-img') as HTMLImageElement;

(async () => {
    const res = await fetch('/app/profile/hero');

    const userData = await res.json();

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

    btn.addEventListener('click', async () => {
        const strength = document.querySelector('.strength');
        const defense = document.querySelector('.defense');
        const resilience = document.querySelector('.resilience');
        const agility = document.querySelector('.agility');

        const total = (+strength.textContent) + (+defense.textContent) + (+resilience.textContent) + (+agility.textContent);

        if (total >= 14 || total <= 7) {
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
            } else {
                const {error} = await res.json();
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
    })
})();

