import { Request, Response } from 'express';

export default function errorHandlingMiddleware(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any,
    req: Request,
    res: Response
) {
    error.statusCode = error.statusCode || 400;

    return error.customMessage || error.message
        ? res.status(error.statusCode).json({
              status: error.statusCode,
              message: error.customMessage || error.message,
          })
        : res.status(error.statusCode).json({ status: error.statusCode, message: error });
}
