export const totals = [...document.querySelectorAll(".range-value")] as HTMLElement[];
// export const plus = [...document.querySelectorAll(".plus__btn")] as HTMLElement[];
// export const minus = [...document.querySelectorAll(".minus__btn")] as HTMLElement[];
const pointValue = document.querySelector(".max-points") as HTMLElement;

interface WarriorBonus {
 [key: string]: { strength: number, defense: number, resilience: number, agility: number}
}

export const warriorBonusPoints = [
    {aztec: {strength: 1, defense: 0, resilience: 1, agility: 1}} as WarriorBonus,
    {celt: {strength: 1, defense: 1, resilience: 0, agility: 1}} as WarriorBonus,
    {chinese: {strength: 0, defense: 1, resilience: 1, agility: 1}} as WarriorBonus,
    {egyptian: {strength: 1, defense: 0, resilience: 1, agility: 1}} as WarriorBonus,
    {greek: {strength: 1, defense: 1, resilience: 1, agility: 0}} as WarriorBonus,
    {indian: {strength: 1, defense: 0, resilience: 1, agility: 1}} as WarriorBonus,
    {slavic: {strength: 1, defense: 1, resilience: 1, agility: 0}} as WarriorBonus,
    {viking: {strength: 1, defense: 1, resilience: 1, agility: 0}} as WarriorBonus,
];

type pointsType = 'strength' | 'defense' | 'resilience' | 'agility';

function initPoints(total: HTMLElement, i: number, hero: string, type: pointsType , warrior: WarriorBonus, minus: HTMLElement[], d: boolean): void {
    if (total.classList.contains(type)) {
        const variable = warrior[hero];
        const result = 1 + variable[type];

        if (d) {
            total.textContent = `${result}`;
        }

        if (total.textContent === `${result}`) {
            minus[i].style.visibility = "hidden";
        }
    }
}

export function configurePoints(hero= 'aztec', d:boolean) {
    const plus = [...document.querySelectorAll(".plus__btn")] as HTMLElement[];
    const minus = [...document.querySelectorAll(".minus__btn")] as HTMLElement[];

    const warrior = warriorBonusPoints.find(el => hero in el)

    totals.forEach((total, i) => {


        initPoints(total, i, hero, 'strength', warrior, minus, d)
        initPoints(total, i, hero, 'defense', warrior, minus, d)
        initPoints(total, i, hero, 'resilience', warrior, minus, d)
        initPoints(total, i, hero, 'agility', warrior, minus, d)


        const points = pointsCounter(13);
        pointValue.textContent = `${points}`;

        minus[i].addEventListener('click', decPoints(total, i, minus, plus, hero, warrior))
        plus[i].addEventListener('click', incPoints(total, i, minus, plus, hero, warrior))

    })
}

export function signBuilder(): void {
    const rangeBox = [...document.querySelectorAll(".range-box")] as HTMLElement[];
    const plus = [...document.querySelectorAll(".plus__btn")] as HTMLSpanElement[];
    const minus = [...document.querySelectorAll(".minus__btn")] as HTMLSpanElement[];

    rangeBox.forEach((el, i) => {
        const newPlus = document.createElement('span');
        newPlus.classList.add('plus__btn');
        newPlus.textContent = '+';

        const newMinus = document.createElement('span');
        newMinus.classList.add('minus__btn');
        newMinus.textContent = '-';

        plus[i].replaceWith(newPlus);
        minus[i].replaceWith(newMinus);
    })
}

function warriorPoints(hero: string, warrior: WarriorBonus, total: HTMLElement, i: number, minus: HTMLElement[]) {
    const variable = warrior[hero];
    const strength = 1 + variable['strength'];
    const defense = 1 + variable['defense'];
    const resilience = 1 + variable['resilience'];
    const agility = 1 + variable['agility'];

    if (+total.textContent <= 5) minus[i].style.visibility = 'visible';

    switch(i) {
        case 0:
            if (+total.textContent === strength) minus[i].style.visibility = 'hidden';
            break;
        case 1:
            if (+total.textContent === defense) minus[i].style.visibility = 'hidden';
            break;
        case 2:
            if (+total.textContent === resilience) minus[i].style.visibility = 'hidden';
            break;
        case 3:
            if (+total.textContent === agility) minus[i].style.visibility = 'hidden';
            break;
    }

}

function incPoints(total: HTMLElement, i: number, minus: HTMLElement[], plus: HTMLElement[], hero: string, warrior: WarriorBonus) {
        return function listener() {
            let val = Number(total.textContent);
            val = val + 1;
            total.textContent = `${val}`;

            let points = pointsCounter(13);
            pointValue.textContent = `${points}`;

            if (points === 0) {
                console.log('wow');
                plus.forEach(val => {
                    val.style.visibility = 'hidden';
                })
            }

            warriorPoints(hero, warrior, total, i, minus)
        }
    }

function decPoints(total: HTMLElement, i: number, minus: HTMLElement[], plus: HTMLElement[], hero: string, warrior: WarriorBonus) {
        return function listener() {
            let val = Number(total.textContent);
            val = val - 1;
            total.textContent = `${val}`;

            let points = pointsCounter(13);
            pointValue.textContent = `${points}`;

            if (points === 6) {
                minus.forEach(val => {
                    val.style.visibility = 'hidden';
                })
            }

            if (+total.textContent >= 1) {
                plus.forEach(val => {
                    val.style.visibility = 'visible';
                })
            }

            warriorPoints(hero, warrior, total, i, minus)

        }
    }

    function pointsCounter(points: number): number {
        const totals = [...document.querySelectorAll(".range-value")] as HTMLElement[];
        totals.forEach((total) => {
            points -= Number(total.textContent);
        })
        return points;
    }

// export function configurePoints() {
//
//     totals.forEach((total, i) => {
//         if (total.textContent === '1') {
//             minus[i].style.visibility = "hidden";
//         }
//         if (pointValue.textContent === '0') {
//             plus[i].style.visibility = "hidden";
//         }
//
//         minus[i].addEventListener('click', decPoints(total, i))
//         plus[i].addEventListener('click', incPoints(total, i))
//     })
//
//     function incPoints(total: HTMLElement, i: number) {
//         return function listener() {
//             let val = Number(total.textContent);
//             val = val + 1;
//             total.textContent = `${val}`;
//
//             let points = pointsCounter(totals, 10);
//             pointValue.textContent = `${points}`;
//
//             if (points === 0) {
//                 plus.forEach(val => {
//                     val.style.visibility = 'hidden';
//                 })
//             }
//
//             if (+total.textContent <= 5) minus[i].style.visibility = 'visible';
//             if (+total.textContent === 1) minus[i].style.visibility = 'hidden';
//         }
//     }
//
//     function decPoints(total: HTMLElement, i: number) {
//         return function listener() {
//             let val = Number(total.textContent);
//             val = val - 1;
//             total.textContent = `${val}`;
//
//             let points = pointsCounter(totals, 10);
//             pointValue.textContent = `${points}`;
//
//             if (points === 6) {
//                 minus.forEach(val => {
//                     val.style.visibility = 'hidden';
//                 })
//             }
//
//             if (+total.textContent === 1) minus[i].style.visibility = 'hidden';
//             if (+total.textContent >= 1) {
//                 plus.forEach(val => {
//                     val.style.visibility = 'visible';
//                 })
//             }
//         }
//     }
//
//     function pointsCounter(totals: HTMLElement[], points: number): number {
//         totals.forEach((total) => {
//             points -= Number(total.textContent);
//         })
//         return points;
//     }
// }
