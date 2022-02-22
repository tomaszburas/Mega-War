export function validatePassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(password);
}
//# sourceMappingURL=validators.js.map