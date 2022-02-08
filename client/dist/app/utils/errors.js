export function handleError(err, req, res, next) {
    res
        .status(err.name === 'ValidationError' ? 400 : 500)
        .json({
        error: err.name === 'ValidationError' ? err.message : err.message,
    });
}
//# sourceMappingURL=errors.js.map