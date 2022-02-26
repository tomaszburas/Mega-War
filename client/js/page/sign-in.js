import {alertMsgNegative} from "../utils/alert.js";

const formWrapper = document.querySelector('.container__wrapper');
const formSubmit = formWrapper.querySelector('.btn');

formSubmit.addEventListener('click', async () => {
    const username = formWrapper.querySelector('input[name="username"]');
    const password = formWrapper.querySelector('input[name="password"]');

    if (!username.value || !password.value) {
        return alertMsgNegative('Please enter your details')
    }

    const res = await fetch('/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        })
    });

    if (res.status === 200) {
        window.location.href = '/app/profile';
    } else if (res.status === 301) {
        window.location.href = '/app/configurator';
    }
    else {
        const {error} = await res.json();
        typeof error === 'string' ? alertMsgNegative(error) : alertMsgNegative(error[0]);
        password.value = '';
    }
});
