import { ErrorRequestHandler, RequestHandler } from "express";
import { Error as MongooseError } from "mongoose";
import { HttpError } from "../errors/http-error";

export const notFoundHandler: RequestHandler = (req, _res, next) => {
    next(new HttpError(404, `Route ${req.method} ${req.originalUrl} not found`));
};

export const globalErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    if (error instanceof MongooseError.CastError) {
        return res.status(400).json({ message: "Niepoprawne id" });
    }

    if (error instanceof MongooseError.ValidationError) {
        return res.status(400).json({ message: error.message });
    }

    const statusCode = error instanceof HttpError ? error.statusCode : 500;
    const message = error instanceof Error ? error.message : "Internal server error";

    if (statusCode === 500) {
        console.error(error);
    }

    res.status(statusCode).json({ message });
};
