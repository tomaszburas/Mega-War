var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const headerNoAuth = `
        <ul class="header__nav__ul">
            <li class="header__user-nav__li">
                <a href="/sign-in" class="header__nav__link" title="Log in">LOG IN</a>
            </li>
            <li class="header__user-nav__li active">
                <a href="/sign-up" class="header__nav__link" title="Sign up">SIGN UP</a>
            </li>
        </ul>
`;
const headerAuth = `
        <ul class="header__nav__ul">
            <li class="header__user-nav__li">
                <a href="/logout" class="header__nav__link" title="Logout">LOGOUT</a>
            </li>
        </ul>
`;
function initializeHeader() {
    window.addEventListener('load', () => __awaiter(this, void 0, void 0, function* () {
        const header = document.querySelector('.header__user-nav');
        const res = yield fetch('/check-authorization');
        const user = yield res.json();
        user ? header.innerHTML = headerAuth : header.innerHTML = headerNoAuth;
    }));
}
initializeHeader();
//# sourceMappingURL=header-init.js.map