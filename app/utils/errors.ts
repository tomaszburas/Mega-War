import {NextFunction, Request, Response} from "express";

export class UserError extends Error {}

export function handleError(err: Error, req: Request, res: Response, next: NextFunction): void {
    res
        .status((err.name === 'ValidationError') || (err instanceof UserError) ? 400 : 500)
        .json({
            error: (err.name === 'ValidationError') || (err instanceof UserError) ? err.message : 'Sorry, please try again later',
        });
}
