import { Request } from 'express';
import { Service } from 'typedi';
import PolizaService from '../services/PolizaService';
import { asyncWrapper } from '../utils/asyncWrapper';
import { SuccessResponse } from '../utils/SuccessResponse';
import { UnauthorizedError } from '../middlewares/AuthMiddleware';
import { UserType } from '../models/user';
import { TipoPoliza } from '../models/poliza';
import { ApplicationError } from '../utils/ApiError';

@Service()
export default class PolizaController {
  constructor(public polizaService: PolizaService) {}

  // Crear una nueva póliza
  createPoliza = asyncWrapper(async (req: Request) => {
    const {
      id_user,
      tipo_poliza,
      fecha_inicio,
      fecha_fin,
      id_aseguradora,
      prima_neta,
      iva,
      gastos_expedicion,
      beneficiario,
      data_vehiculo,
      data_hogar,
      data_copropiedad,
      data_general,
      coberturas
    } = req.body;

    // Si el usuario es admin o agente, puede crear pólizas para cualquier usuario
    // Si se proporciona id_user, se usa ese, de lo contrario se usa el id del usuario autenticado
    let userId = req.user?.id;
    
    if (req.user?.type === UserType.ADMIN || req.user?.type === UserType.AGENTE) {
      userId = id_user || userId;
    }

    if (!userId) {
      throw new ApplicationError('ID de usuario no proporcionado');
    }

    // Determinar qué datos usar según el tipo de póliza
    let data;
    switch (tipo_poliza) {
      case TipoPoliza.VEHICULOS:
        if (!data_vehiculo) {
          throw new ApplicationError('Datos de vehículo requeridos para póliza de vehículos');
        }
        data = data_vehiculo;
        break;
      case TipoPoliza.HOGAR:
        if (!data_hogar) {
          throw new ApplicationError('Datos de hogar requeridos para póliza de hogar');
        }
        data = data_hogar;
        break;
      case TipoPoliza.COPROPIEDADES:
        if (!data_copropiedad) {
          throw new ApplicationError('Datos de copropiedad requeridos para póliza de copropiedades');
        }
        data = data_copropiedad;
        break;
      default:
        // Para otros tipos de pólizas, usar datos generales
        data = data_general;
        break;
    }

    const poliza = await this.polizaService.createPoliza(
      userId,
      tipo_poliza,
      new Date(fecha_inicio),
      new Date(fecha_fin),
      id_aseguradora,
      prima_neta,
      iva,
      gastos_expedicion,
      beneficiario,
      data,
      coberturas
    );

    return new SuccessResponse(poliza);
  });

  // Obtener todas las pólizas
  getAllPolizas = asyncWrapper(async () => {
    const polizas = await this.polizaService.getAllPolizas();
    return new SuccessResponse(polizas);
  });

  // Obtener pólizas por usuario
  getPolizasByUser = asyncWrapper(async (req: Request) => {
    let userId: number | undefined = undefined;
    
    // Si se proporciona un userId en los parámetros
    if (req.params.userId) {
      // Solo admin y agente pueden ver pólizas de otros usuarios
      if (req.user?.type !== UserType.ADMIN && req.user?.type !== UserType.AGENTE) {
        throw new UnauthorizedError('No tienes permisos para ver pólizas de otros usuarios');
      }
      userId = parseInt(req.params.userId);
    } else {
      // Si no se proporciona userId, se usa el del usuario autenticado
      userId = req.user?.id;
    }
    
    if (!userId) {
      throw new ApplicationError('ID de usuario no proporcionado');
    }
    
    const polizas = await this.polizaService.getPolizasByUser(userId);
    return new SuccessResponse(polizas);
  });

  // Obtener una póliza por ID
  getPolizaById = asyncWrapper(async (req: Request) => {
    const id = parseInt(req.params.id);
    const poliza = await this.polizaService.getPolizaById(id);
    
    // Verificar si el usuario tiene permisos para ver esta póliza
    if (
      req.user?.type !== UserType.ADMIN && 
      req.user?.type !== UserType.AGENTE && 
      poliza.id_user !== req.user?.id
    ) {
      throw new UnauthorizedError('No tienes permisos para ver esta póliza');
    }
    
    return new SuccessResponse(poliza);
  });

  // Actualizar una póliza
  updatePoliza = asyncWrapper(async (req: Request) => {
    const id = parseInt(req.params.id);
    const {
      tipo_poliza,
      fecha_inicio,
      fecha_fin,
      id_aseguradora,
      prima_neta,
      iva,
      gastos_expedicion,
      beneficiario,
      data_vehiculo,
      data_hogar,
      data_copropiedad,
      data_general,
      coberturas
    } = req.body;
    
    // Verificar si el usuario tiene permisos para actualizar esta póliza
    const polizaExistente = await this.polizaService.getPolizaById(id);
    
    if (
      req.user?.type !== UserType.ADMIN && 
      req.user?.type !== UserType.AGENTE
    ) {
      throw new UnauthorizedError('No tienes permisos para actualizar esta póliza');
    }
    
    // Determinar qué datos usar según el tipo de póliza
    let data;
    if (tipo_poliza) {
      switch (tipo_poliza) {
        case TipoPoliza.VEHICULOS:
          if (data_vehiculo) {
            data = data_vehiculo;
          }
          break;
        case TipoPoliza.HOGAR:
          if (data_hogar) {
            data = data_hogar;
          }
          break;
        case TipoPoliza.COPROPIEDADES:
          if (data_copropiedad) {
            data = data_copropiedad;
          }
          break;
        default:
          // Para otros tipos de pólizas, usar datos generales
          if (data_general) {
            data = data_general;
          }
          break;
      }
    } else {
      // Si no se proporciona tipo_poliza, usar el tipo existente
      switch (polizaExistente.tipo_poliza) {
        case TipoPoliza.VEHICULOS:
          if (data_vehiculo) {
            data = data_vehiculo;
          }
          break;
        case TipoPoliza.HOGAR:
          if (data_hogar) {
            data = data_hogar;
          }
          break;
        case TipoPoliza.COPROPIEDADES:
          if (data_copropiedad) {
            data = data_copropiedad;
          }
          break;
        default:
          // Para otros tipos de pólizas, usar datos generales
          if (data_general) {
            data = data_general;
          }
          break;
      }
    }

    // Construir el objeto de actualización
    const polizaData: any = {};
    
    if (tipo_poliza) polizaData.tipo_poliza = tipo_poliza;
    if (fecha_inicio) polizaData.fecha_inicio = new Date(fecha_inicio);
    if (fecha_fin) polizaData.fecha_fin = new Date(fecha_fin);
    if (id_aseguradora) polizaData.id_aseguradora = id_aseguradora;
    if (prima_neta) polizaData.prima_neta = prima_neta;
    if (iva !== undefined) polizaData.iva = iva;
    if (gastos_expedicion !== undefined) polizaData.gastos_expedicion = gastos_expedicion;
    if (beneficiario) polizaData.beneficiario = beneficiario;
    if (data) polizaData.data = data;
    if (coberturas) polizaData.coberturas = coberturas;
    
    const poliza = await this.polizaService.updatePoliza(id, polizaData);
    return new SuccessResponse(poliza);
  });

  // Eliminar una póliza
  deletePoliza = asyncWrapper(async (req: Request) => {
    const id = parseInt(req.params.id);
    
    // Solo los administradores pueden eliminar pólizas
    if (req.user?.type !== UserType.ADMIN) {
      throw new UnauthorizedError('No tienes permisos para eliminar esta póliza');
    }
    
    const result = await this.polizaService.deletePoliza(id);
    return new SuccessResponse(result);
  });
} 