import {alertMsgNegative} from "../utils/alert.js";
import {configurePoints} from "../utils/points-configurator.js";

configurePoints();

const btn = document.querySelector('.btn');

btn.addEventListener('click', async () => {
    const strength = document.querySelector('.strength');
    const defense = document.querySelector('.defense');
    const resilience = document.querySelector('.resilience');
    const agility = document.querySelector('.agility');
    const warriors = [...document.querySelectorAll('input[name="warrior"]')] as HTMLInputElement[];
    const warriorName = ['aztec', 'celt', 'chinese', 'egyptian', 'greek', 'indian', 'slavic', 'viking']

    const total = (+strength.textContent) + (+defense.textContent) + (+resilience.textContent) + (+agility.textContent);

    const warrior = warriors.find(warrior => warrior.checked)

    if (total >= 11 || total <= 3 || !warriorName.find(hero => hero === warrior.value)) {
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
                warrior: warrior.value,
            })
        })
        if (res.status === 200) {
            window.location.href = '/app/profile';
        }
    }

})
