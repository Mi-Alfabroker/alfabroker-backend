import express from 'express';
import AseguradoraController from '../controllers/AseguradoraController';
import { authenticate, authorize } from '../middlewares/AuthMiddleware';
import { UserType } from '../models/user';

const router = express.Router();

// Rutas públicas
router.get('/', AseguradoraController.getAll);
router.get('/:id', AseguradoraController.getById);

// Rutas protegidas (solo administradores)
router.post('/', authenticate, authorize(UserType.ADMIN), AseguradoraController.create);
router.put('/:id', authenticate, authorize(UserType.ADMIN), AseguradoraController.update);
router.delete('/:id', authenticate, authorize(UserType.ADMIN), AseguradoraController.delete);

export default router; 