import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestError } from '../utils/ApiError';

export default class RequestValidator {
  static validate = <T extends object>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const convertedObject = plainToInstance(classInstance, req.body);
      const errors = await validate(convertedObject);
      
      if (errors.length > 0) {
        let rawErrors: string[] = [];
        for (const errorItem of errors) {
          rawErrors = rawErrors.concat(...rawErrors, Object.values(errorItem.constraints ?? []));
        }
        return next(new BadRequestError('Request validation failed!', rawErrors));
      }
      
      next();
    };
  };
}
