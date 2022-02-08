import {alertMsgNegative} from "./alert.js";

const formWrapper = document.querySelector('.container__wrapper');
const formSubmit = formWrapper.querySelector('.btn');

formSubmit.addEventListener('click', async () => {
    const username: HTMLInputElement = formWrapper.querySelector('input[name="username"]');
    const password: HTMLInputElement = formWrapper.querySelector('input[name="password"]');

    if (!username && !password) {
        return alertMsgNegative('Please enter your details')
    }

    const res = await fetch('/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    });

    if (res.status === 200) {
        window.location.href = '/app';
    } else {
        const {error} = await res.json();
        alertMsgNegative(error);
        password.value = '';

    }
});
