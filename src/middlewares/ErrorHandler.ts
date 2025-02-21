import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export default class ErrorHandler {
  static handle = () => {
    return async (err: ApiError, req: Request, res: Response, next: NextFunction) => {
      const statusCode = err.statusCode || 500;
      res.status(statusCode).send({
        success: false,
        message: err.message,
        rawErrors: err.rawErrors ?? [],
        stack: err.stack,
      });
    };
  };

  static initializeUnhandledException = () => {
    process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
      throw reason;
    });

    process.on('uncaughtException', (err: Error) => {
      process.exit(1);
    });
  };
}
