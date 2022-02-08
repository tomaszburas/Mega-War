import {alertMsgNegative, alertMsgPositive} from "./alert.js";

const formWrapper = document.querySelector('.container__wrapper');
const formSubmit = formWrapper.querySelector('.btn');

formSubmit.addEventListener('click', async () => {
    const username: HTMLInputElement = formWrapper.querySelector('input[name="username"]');
    const password: HTMLInputElement = formWrapper.querySelector('input[name="password"]');
    const email: HTMLInputElement = formWrapper.querySelector('input[name="email"]');


    if (!username.value && !password.value && !email.value) {
        return alertMsgNegative('Please enter your details');
    }

    const res = await fetch('/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    });

    if (res.status === 200) {
        username.value = '';
        password.value = '';

        alertMsgPositive('Thanks for registration')
        setTimeout(() => {
            window.location.href = '/sign-in';
        }, 3000);
    } else {
        let {error} = await res.json();
        typeof error === 'string' ? alertMsgNegative(error) : alertMsgNegative(error[0]);
        password.value = '';
    }
});
