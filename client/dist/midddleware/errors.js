export class UserError extends Error {
}
export function handleError(err, req, res, next) {
    res
        .status((err.name === 'ValidationError') || (err instanceof UserError) ? 400 : 500)
        .json({
        error: (err.name === 'ValidationError') || (err instanceof UserError) ? err.message : 'Sorry, please try again later',
    });
}
//# sourceMappingURL=errors.js.map