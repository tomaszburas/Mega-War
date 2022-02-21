const totals = [...document.querySelectorAll(".range-value")];
const pointValue = document.querySelector(".max-points");
const warriorBonusPoints = [
    { aztec: { strength: 1, defense: 0, resilience: 1, agility: 1 } },
    { celt: { strength: 1, defense: 1, resilience: 0, agility: 1 } },
    { chinese: { strength: 0, defense: 1, resilience: 1, agility: 1 } },
    { egyptian: { strength: 1, defense: 0, resilience: 1, agility: 1 } },
    { greek: { strength: 1, defense: 1, resilience: 1, agility: 0 } },
    { indian: { strength: 1, defense: 0, resilience: 1, agility: 1 } },
    { slavic: { strength: 1, defense: 1, resilience: 1, agility: 0 } },
    { viking: { strength: 1, defense: 1, resilience: 1, agility: 0 } },
];
const pointsTypeName = ['strength', 'defense', 'resilience', 'agility'];
function initPoints(total, i, hero, type, warrior, minus, configurator) {
    if (total.classList.contains(type)) {
        const variable = warrior[hero];
        const result = 1 + variable[type];
        if (configurator) {
            total.textContent = `${result}`;
        }
        if (total.textContent === `${result}`) {
            minus[i].style.visibility = "hidden";
        }
    }
}
export function configurePoints(hero = 'aztec', configurator) {
    const plus = [...document.querySelectorAll(".plus__btn")];
    const minus = [...document.querySelectorAll(".minus__btn")];
    const warrior = warriorBonusPoints.find(el => hero in el);
    totals.forEach((total, i) => {
        pointsTypeName.forEach(e => {
            initPoints(total, i, hero, e, warrior, minus, configurator);
        });
        const points = pointsCounter(13);
        pointValue.textContent = `${points}`;
        if (points === 0) {
            plus.forEach(val => {
                val.style.visibility = 'hidden';
            });
        }
        minus[i].addEventListener('click', decPoints(total, i, minus, plus, hero, warrior));
        plus[i].addEventListener('click', incPoints(total, i, minus, plus, hero, warrior));
    });
}
export function signBuilder() {
    const rangeBox = [...document.querySelectorAll(".range-box")];
    const plus = [...document.querySelectorAll(".plus__btn")];
    const minus = [...document.querySelectorAll(".minus__btn")];
    rangeBox.forEach((el, i) => {
        const newPlus = document.createElement('span');
        newPlus.classList.add('plus__btn');
        newPlus.textContent = '+';
        const newMinus = document.createElement('span');
        newMinus.classList.add('minus__btn');
        newMinus.textContent = '-';
        plus[i].replaceWith(newPlus);
        minus[i].replaceWith(newMinus);
    });
}
function warriorPoints(hero, warrior, total, i, minus) {
    const variable = warrior[hero];
    const strength = 1 + variable['strength'];
    const defense = 1 + variable['defense'];
    const resilience = 1 + variable['resilience'];
    const agility = 1 + variable['agility'];
    if (+total.textContent <= 5)
        minus[i].style.visibility = 'visible';
    switch (i) {
        case 0:
            if (+total.textContent === strength)
                minus[i].style.visibility = 'hidden';
            break;
        case 1:
            if (+total.textContent === defense)
                minus[i].style.visibility = 'hidden';
            break;
        case 2:
            if (+total.textContent === resilience)
                minus[i].style.visibility = 'hidden';
            break;
        case 3:
            if (+total.textContent === agility)
                minus[i].style.visibility = 'hidden';
            break;
    }
}
function incPoints(total, i, minus, plus, hero, warrior) {
    return function listener() {
        let val = Number(total.textContent);
        val = val + 1;
        total.textContent = `${val}`;
        let points = pointsCounter(13);
        pointValue.textContent = `${points}`;
        if (points === 0) {
            plus.forEach(val => {
                val.style.visibility = 'hidden';
            });
        }
        warriorPoints(hero, warrior, total, i, minus);
    };
}
function decPoints(total, i, minus, plus, hero, warrior) {
    return function listener() {
        let val = Number(total.textContent);
        val = val - 1;
        total.textContent = `${val}`;
        let points = pointsCounter(13);
        pointValue.textContent = `${points}`;
        if (points === 6) {
            minus.forEach(val => {
                val.style.visibility = 'hidden';
            });
        }
        if (+total.textContent >= 1) {
            plus.forEach(val => {
                val.style.visibility = 'visible';
            });
        }
        warriorPoints(hero, warrior, total, i, minus);
    };
}
function pointsCounter(points) {
    const totals = [...document.querySelectorAll(".range-value")];
    totals.forEach((total) => {
        points -= Number(total.textContent);
    });
    return points;
}
//# sourceMappingURL=points-configurator.js.map