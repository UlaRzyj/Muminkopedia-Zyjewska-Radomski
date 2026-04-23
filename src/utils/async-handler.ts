import { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncController = (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction
) => Promise<unknown> | unknown;

export const asyncHandler = (controller: AsyncController): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(controller(req, res, next)).catch(next);
    };
};
