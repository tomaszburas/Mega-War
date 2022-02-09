const totals = [...document.querySelectorAll(".range-value")];
const plus = [...document.querySelectorAll(".plus__btn")];
const minus = [...document.querySelectorAll(".minus__btn")];
const pointValue = document.querySelector(".max-points");
totals.forEach((total, i) => {
    minus[i].style.visibility = "hidden";
    minus[i].addEventListener('click', decPoints(total, 7, i));
    plus[i].addEventListener('click', incPoints(total, i));
});
function incPoints(total, i) {
    return function listener() {
        let val = Number(total.textContent);
        val = val + 1;
        total.textContent = `${val}`;
        let points = pointsCounter(totals, 10);
        pointValue.textContent = `${points}`;
        if (points === 0) {
            plus.forEach(val => {
                val.style.visibility = 'hidden';
            });
        }
        if (+total.textContent <= 5)
            minus[i].style.visibility = 'visible';
        if (+total.textContent === 1)
            minus[i].style.visibility = 'hidden';
    };
}
function decPoints(total, maxPoints, i) {
    return function listener() {
        let val = Number(total.textContent);
        val = val - 1;
        total.textContent = `${val}`;
        let points = pointsCounter(totals, 10);
        pointValue.textContent = `${points}`;
        if (points === 6) {
            minus.forEach(val => {
                val.style.visibility = 'hidden';
            });
        }
        if (+total.textContent === 1)
            minus[i].style.visibility = 'hidden';
        if (+total.textContent >= 1) {
            plus.forEach(val => {
                val.style.visibility = 'visible';
            });
        }
    };
}
function pointsCounter(totals, points) {
    totals.forEach((total) => {
        points -= Number(total.textContent);
    });
    return points;
}
//# sourceMappingURL=configurator.js.map