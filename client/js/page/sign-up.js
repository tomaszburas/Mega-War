import {alertMsgNegative, alertMsgPositive} from "../utils/alert.js";

const formWrapper = document.querySelector('.container__wrapper');
const formSubmit = formWrapper.querySelector('.btn');

formSubmit.addEventListener('click', async () => {
    const username = formWrapper.querySelector('input[name="username"]');
    const password = formWrapper.querySelector('input[name="password"]');

    if (username.value.length > 30) {
        return alertMsgNegative('Username cannot exceed 30 characters');
    }

    if (!username.value || !password.value) {
        return alertMsgNegative('Please enter your details');
    } else {
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
            alertMsgNegative(error);
            password.value = '';
        }
    }

});
