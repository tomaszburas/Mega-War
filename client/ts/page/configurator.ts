import {alertMsgNegative} from "../utils/alert.js";

const totals = [...document.querySelectorAll(".range-value")] as HTMLElement[];
const plus = [...document.querySelectorAll(".plus__btn")] as HTMLElement[];
const minus = [...document.querySelectorAll(".minus__btn")] as HTMLElement[];
const pointValue = document.querySelector(".max-points") as HTMLElement;

const btn = document.querySelector('.btn');

totals.forEach((total, i) => {
    minus[i].style.visibility = "hidden";
    minus[i].addEventListener('click', decPoints(total, i))
    plus[i].addEventListener('click', incPoints(total, i))
})

function incPoints(total: HTMLElement, i: number) {
    return function listener() {
        let val = Number(total.textContent);
        val = val+1;
        total.textContent = `${val}`;

        let points = pointsCounter(totals, 10);
        pointValue.textContent = `${points}`;

        if (points === 0) {
            plus.forEach(val => {
                val.style.visibility = 'hidden';
            })
        }

        if (+total.textContent <= 5) minus[i].style.visibility = 'visible';
        if (+total.textContent === 1) minus[i].style.visibility = 'hidden';

    }
}

function decPoints(total: HTMLElement, i: number) {
    return function listener() {
        let val = Number(total.textContent);
        val = val-1;
        total.textContent = `${val}`;

        let points = pointsCounter(totals, 10);
        pointValue.textContent = `${points}`;

        if (points === 6) {
            minus.forEach(val => {
                val.style.visibility = 'hidden';
            })
        }

        if (+total.textContent === 1) minus[i].style.visibility = 'hidden';
        if (+total.textContent >= 1) {
            plus.forEach(val => {
                val.style.visibility = 'visible';
            })
        }
    }
}

function pointsCounter(totals: HTMLElement[], points: number): number {
    totals.forEach((total) => {
        points -= Number(total.textContent);
    })
    return points;
}

btn.addEventListener('click', async () => {
    const strength = document.querySelector('.strength');
    const defense = document.querySelector('.defense');
    const resilience = document.querySelector('.resilience');
    const agility = document.querySelector('.agility');
    const warriors = [...document.querySelectorAll('input[name="warrior"]')] as HTMLInputElement[];

    const total = (+strength.textContent) + (+defense.textContent) + (+resilience.textContent) + (+agility.textContent);

    const warrior = warriors.find(warrior => warrior.checked)

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
                warrior: warrior.value,
            })
        })
        if (res.status === 200) {
            window.location.href = '/app/profile';
        }
    }

})
