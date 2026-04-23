import { ErrorRequestHandler, RequestHandler } from "express";
import { HttpError } from "../errors/http-error";

export const notFoundHandler: RequestHandler = (req, _res, next) => {
    next(new HttpError(404, `Route ${req.method} ${req.originalUrl} not found`));
};

export const globalErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    const statusCode = error instanceof HttpError ? error.statusCode : 500;
    const message = error instanceof Error ? error.message : "Internal server error";

    if (statusCode === 500) {
        console.error(error);
    }

    res.status(statusCode).json({ message });
};
