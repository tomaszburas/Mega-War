import {alertMsgNegative} from "../utils/alert.js";
import {configurePoints, signBuilder} from "../utils/points-configurator.js";

const btn = document.querySelector('.btn');
const warriors = [...document.querySelectorAll('.radio-container')] as HTMLElement[];
const bonusText = document.querySelector('.hero-bonus__text');
const heroImg = [...document.querySelectorAll('.radio-image')] as HTMLImageElement[];
const heroName = [...document.querySelectorAll('.hero-name')] as HTMLSpanElement[];
const checked = [...document.querySelectorAll('.radio-hidden')] as HTMLInputElement[];

const heroBonusText: { [key: string]: string } = {
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

btn.addEventListener('click', async () => {
    const strength = document.querySelector('.strength');
    const defense = document.querySelector('.defense');
    const resilience = document.querySelector('.resilience');
    const agility = document.querySelector('.agility');
    const warriors = [...document.querySelectorAll('input[name="warrior"]')] as HTMLInputElement[];
    const warriorName = ['aztec', 'celt', 'chinese', 'egyptian', 'greek', 'indian', 'slavic', 'viking']

    const total = (+strength.textContent) + (+defense.textContent) + (+resilience.textContent) + (+agility.textContent);

    const warrior = warriors.find(warrior => warrior.checked)
    console.log(warrior);

    if (total >= 14 || total <= 6 || !warriorName.find(hero => hero === warrior.value)) {
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

});

warriors.forEach((warrior, i) => {
    warrior.addEventListener('click', (e) => {
        e.preventDefault();
        const warriorName = warrior.getAttribute('data-warrior');
        warriors.forEach((el,index) => {
            if (index === i) {
                heroImg[index].classList.add('radio-image-active');
                heroName[index].classList.add('hero-name-active');
                checked[index].setAttribute('checked', 'true');
            } else {
                heroImg[index].classList.remove('radio-image-active')
                heroName[index].classList.remove('hero-name-active')
                checked[index].setAttribute('checked', 'false');
            }
        })

        signBuilder();
        configurePoints(warriorName, true);

        let text = '';
        for (let txt in heroBonusText) {
            if (txt === warriorName) {
                text = `Bonus for ${heroBonusText[txt]}`
            }
        }
        bonusText.textContent = text;
    })
})
