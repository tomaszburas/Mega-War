var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const rankingOl = document.querySelector('.ranking-ol');
(() => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch('/get-ranking');
    const data = yield res.json();
    createRanking(data);
}))();
function createRanking(data) {
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
    });
}
export {};
//# sourceMappingURL=ranking.js.map