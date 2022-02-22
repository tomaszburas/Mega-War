export function validatePassword(password: string): boolean {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(password);
}
