import express from 'express';
import { Container } from 'typedi';
import PolizaController from '../controllers/PolizaController';
import { authenticate, authorize } from '../middlewares/AuthMiddleware';
import { UserType } from '../models/user';
import RequestValidator from '../middlewares/RequestValidator';
import { PolizaRequest, UpdatePolizaRequest } from '../requests/PolizaRequest';

const router = express.Router();
const polizaController = Container.get(PolizaController);

// Middleware de autenticación para todas las rutas
router.use(authenticate);

// Crear una nueva póliza (solo admin y agente)
router.post(
  '/',
  authorize(UserType.ADMIN, UserType.AGENTE),
  RequestValidator.validate(PolizaRequest),
  polizaController.createPoliza
);

// Obtener todas las pólizas (solo admin)
router.get(
  '/',
  authorize(UserType.ADMIN),
  polizaController.getAllPolizas
);

// Obtener pólizas por usuario
// Los clientes solo pueden ver sus propias pólizas
// Los admin y agentes pueden ver las pólizas de cualquier usuario
router.get(
  '/user/:userId?',
  polizaController.getPolizasByUser
);

// Obtener una póliza por ID
router.get(
  '/:id',
  polizaController.getPolizaById
);

// Actualizar una póliza (solo admin y agente)
router.put(
  '/:id',
  authorize(UserType.ADMIN, UserType.AGENTE),
  RequestValidator.validate(UpdatePolizaRequest),
  polizaController.updatePoliza
);

// Eliminar una póliza (solo admin)
router.delete(
  '/:id',
  authorize(UserType.ADMIN),
  polizaController.deletePoliza
);

export default router; 