var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { alertMsgNegative } from "./alert.js";
const formWrapper = document.querySelector('.container__wrapper');
const formSubmit = formWrapper.querySelector('.btn');
formSubmit.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const username = formWrapper.querySelector('input[name="username"]');
    const password = formWrapper.querySelector('input[name="password"]');
    if (!username.value || !password.value) {
        return alertMsgNegative('Please enter your details');
    }
    const res = yield fetch('/sign-in', {
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
    }
    else {
        const { error } = yield res.json();
        typeof error === 'string' ? alertMsgNegative(error) : alertMsgNegative(error[0]);
        password.value = '';
    }
}));
//# sourceMappingURL=sign-in.js.map