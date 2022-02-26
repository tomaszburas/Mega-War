function alertMsgPositive(string) {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    div.classList.add('alert');

    const txt = document.createElement('p');

    txt.classList.add('alert-text-positive', 'animate__animated', 'animate__fadeInDown');
    txt.innerText = `🎉 ${string}`;

    div.style.top = `${window.pageYOffset + 20}px`;

    div.appendChild(txt);
    body.appendChild(div);

    setTimeout(() => {
        txt.classList.add('animate__fadeOutUp');
    }, 2000);

    setTimeout(() => {
        body.removeChild(div);
    }, 3000);
}

function alertMsgNegative(string) {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    div.classList.add('alert');

    const txt = document.createElement('p');

    txt.classList.add('alert-text-negative', 'animate__animated', 'animate__fadeInDown');
    txt.innerText = `📣 ${string}`;

    div.style.top = `${window.pageYOffset + 20}px`;

    div.appendChild(txt);
    body.appendChild(div);

    setTimeout(() => {
        txt.classList.add('animate__fadeOutUp');
    }, 2000);

    setTimeout(() => {
        body.removeChild(div);
    }, 3000);
}

export { alertMsgPositive, alertMsgNegative };
