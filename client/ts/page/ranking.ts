import {Ranking} from "../../../app/ts/interfaces/Ranking";

const rankingOl = document.querySelector('.ranking-ol');

(async() => {
    const res = await fetch('/get-ranking');
    const data = await res.json();

    createRanking(data);
})();

function createRanking(data: Ranking[]): void {
    data.forEach(el => {
        const li = document.createElement('li');
        li.classList.add('ranking-li');

        const place = document.createElement('span');
        place.classList.add('ranking-title-place');
        place.textContent = `${el.place}`;

        const username = document.createElement('span');
        username.classList.add('ranking-title-username');
        username.textContent = `${el.username}`;

        const nation = document.createElement('span');
        nation.classList.add('ranking-title-nation');
        nation.textContent = `${el.nation}`;

        const wins = document.createElement('span');
        wins.classList.add('ranking-title-wins');
        wins.textContent = `${el.wins}`;

        const defeats = document.createElement('span');
        defeats.classList.add('ranking-title-defeats');
        defeats.textContent = `${el.defeats}`;

        li.appendChild(place);
        li.appendChild(username);
        li.appendChild(nation);
        li.appendChild(wins);
        li.appendChild(defeats);

        rankingOl.appendChild(li);
    })
}
