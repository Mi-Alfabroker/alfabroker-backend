import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserType } from '../models/user';
import { ApiError } from '../utils/ApiError';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// Clase para errores de autorización
export class UnauthorizedError extends ApiError {
  constructor(message: string, errors?: string[]) {
    super(StatusCodes.UNAUTHORIZED, message, errors);
  }
}

// Extender la interfaz Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        type: UserType;
        nombre: string;
        estado: string;
      };
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token no proporcionado', ['TOKEN_NOT_PROVIDED']);
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new UnauthorizedError('Token no proporcionado', ['TOKEN_NOT_PROVIDED']);
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      email: string;
      type: UserType;
      nombre: string;
      estado: string;
    };
    
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError('Token inválido', ['INVALID_TOKEN']));
    } else {
      next(error);
    }
  }
};

export const authorize = (...allowedRoles: UserType[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError('Usuario no autenticado', ['USER_NOT_AUTHENTICATED']));
    }
    
    if (!allowedRoles.includes(req.user.type)) {
      return next(new UnauthorizedError('No tienes permisos para realizar esta acción', ['INSUFFICIENT_PERMISSIONS']));
    }
    
    next();
  };
}; 