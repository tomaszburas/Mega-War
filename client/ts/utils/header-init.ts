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

function initializeHeader(): void {
    window.addEventListener('load', async () => {
        const header = document.querySelector('.header__user-nav');

        const res = await fetch('/check-authorization');
        const user = await res.json();

        user ? header.innerHTML = headerAuth : header.innerHTML = headerNoAuth;
    });
}

initializeHeader();
