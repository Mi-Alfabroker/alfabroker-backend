import { Request, Response, NextFunction } from 'express';
import { Aseguradora } from '../models';
import { ApplicationError, NotFoundError } from '../utils/ApiError';
import { UnauthorizedError } from '../middlewares/AuthMiddleware';
import { UserType } from '../models/user';

export default class AseguradoraController {
  /**
   * Obtener todas las aseguradoras
   */
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const aseguradoras = await Aseguradora.findAll();
      return res.status(200).json({ data: aseguradoras });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtener una aseguradora por ID
   */
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const aseguradora = await Aseguradora.findByPk(id);
      
      if (!aseguradora) {
        throw new NotFoundError(`Aseguradora con ID ${id} no encontrada`);
      }
      
      return res.status(200).json({ data: aseguradora });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crear una nueva aseguradora
   */
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      // Verificar que el usuario sea administrador
      if (req.user?.type !== UserType.ADMIN) {
        throw new UnauthorizedError('Solo los administradores pueden crear aseguradoras');
      }
      
      const { nombre, telefono, cobertura, comisiones } = req.body;
      
      // Validar datos requeridos
      if (!nombre || !telefono) {
        throw new ApplicationError('Nombre y teléfono son campos requeridos');
      }
      
      const aseguradora = await Aseguradora.create({
        nombre,
        telefono,
        cobertura: cobertura || [],
        comisiones: comisiones || []
      });
      
      return res.status(201).json({ data: aseguradora });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Actualizar una aseguradora existente
   */
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      // Verificar que el usuario sea administrador
      if (req.user?.type !== UserType.ADMIN) {
        throw new UnauthorizedError('Solo los administradores pueden actualizar aseguradoras');
      }
      
      const { id } = req.params;
      const { nombre, telefono, cobertura, comisiones } = req.body;
      
      const aseguradora = await Aseguradora.findByPk(id);
      
      if (!aseguradora) {
        throw new NotFoundError(`Aseguradora con ID ${id} no encontrada`);
      }
      
      // Actualizar solo los campos proporcionados
      if (nombre) aseguradora.nombre = nombre;
      if (telefono) aseguradora.telefono = telefono;
      if (cobertura) aseguradora.cobertura = cobertura;
      if (comisiones) aseguradora.comisiones = comisiones;
      
      await aseguradora.save();
      
      return res.status(200).json({ data: aseguradora });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Eliminar una aseguradora
   */
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      // Verificar que el usuario sea administrador
      if (req.user?.type !== UserType.ADMIN) {
        throw new UnauthorizedError('Solo los administradores pueden eliminar aseguradoras');
      }
      
      const { id } = req.params;
      const aseguradora = await Aseguradora.findByPk(id);
      
      if (!aseguradora) {
        throw new NotFoundError(`Aseguradora con ID ${id} no encontrada`);
      }
      
      await aseguradora.destroy();
      
      return res.status(200).json({ message: 'Aseguradora eliminada correctamente' });
    } catch (error) {
      next(error);
    }
  }
} 