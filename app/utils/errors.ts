import {NextFunction, Request, Response} from "express";

export function handleError(err: Error, req: Request, res: Response, next: NextFunction): void {
    res
        .status(err.name === 'ValidationError' ? 400 : 500)
        .json({
            error: err.name === 'ValidationError' ? err.message : err.message,
        });
}
