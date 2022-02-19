export function configurePoints() {
    const totals = [...document.querySelectorAll(".range-value")] as HTMLElement[];
    const plus = [...document.querySelectorAll(".plus__btn")] as HTMLElement[];
    const minus = [...document.querySelectorAll(".minus__btn")] as HTMLElement[];
    const pointValue = document.querySelector(".max-points") as HTMLElement;

    totals.forEach((total, i) => {
        if (total.textContent === '1') {
            minus[i].style.visibility = "hidden";
        }
        if (pointValue.textContent === '0') {
            plus[i].style.visibility = "hidden";
        }

        minus[i].addEventListener('click', decPoints(total, i))
        plus[i].addEventListener('click', incPoints(total, i))
    })

    function incPoints(total: HTMLElement, i: number) {
        return function listener() {
            let val = Number(total.textContent);
            val = val + 1;
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
            val = val - 1;
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
}
