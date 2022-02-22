import {alertMsgNegative, alertMsgPositive} from "../utils/alert.js";

const formWrapper = document.querySelector('.container__wrapper');
const formSubmit = formWrapper.querySelector('.btn');

formSubmit.addEventListener('click', async () => {
    const username: HTMLInputElement = formWrapper.querySelector('input[name="username"]');
    const password: HTMLInputElement = formWrapper.querySelector('input[name="password"]');

    if (!username.value || !password.value) {
        return alertMsgNegative('Please enter your details');
    } else {
        console.log('hola');
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
    }

});
