import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestError } from '../utils/ApiError';

export default class RequestValidator {
  static validate = <T extends object>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        //console.log('=== RequestValidator Debug ===');
        //console.log('Original Body:', req.body);
        
        const convertedObject = plainToInstance(classInstance, req.body);
        //console.log('Converted Object:', convertedObject);
        
        const errors = await validate(convertedObject);
        console.log('Validation Errors:', JSON.stringify(errors, null, 2));
        
        if (errors.length > 0) {
          const rawErrors: string[] = [];
          for (const errorItem of errors) {
            //console.log('Processing Error Item:', errorItem);
            if (errorItem.constraints) {
              rawErrors.push(...Object.values(errorItem.constraints));
            }
          }
          throw new BadRequestError('Request validation failed!', rawErrors);
        }
        
        req.body = convertedObject; // Asignar el objeto convertido al body
        next();
      } catch (error) {
        console.error('Validation Error:', error);
        next(error);
      }
    };
  };
}
