import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {}

export function handleError(err: Error, req: Request, res: Response, next: NextFunction): void {
    res
        .status(err instanceof ValidationError ? 400 : 500)
        .json({
            error: err instanceof ValidationError ? err.message : err.message,
        });
}
