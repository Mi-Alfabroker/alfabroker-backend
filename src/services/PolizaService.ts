import { Service } from 'typedi';
import { LoggerClient } from './LoggerClient';
import Poliza, { TipoPoliza } from '../models/poliza';
import { ApplicationError } from '../utils/ApiError';
import { DatosPoliza, Beneficiario } from '../types/polizas';
import { CoberturaAseguradora } from '../types/aseguradora';
import { StatusCodes } from 'http-status-codes';

@Service()
export default class PolizaService {
  constructor(public logger: LoggerClient) {}

  // Crear una nueva póliza
  createPoliza = async (
    id_user: number,
    tipo_poliza: TipoPoliza,
    fecha_inicio: Date,
    fecha_fin: Date,
    id_aseguradora: number,
    prima_neta: number,
    iva: number = 0,
    gastos_expedicion: number = 0,
    beneficiario?: Beneficiario,
    data?: DatosPoliza,
    coberturas?: CoberturaAseguradora[]
  ) => {
    try {
      const poliza = await Poliza.create({
        id_user,
        tipo_poliza,
        fecha_inicio,
        fecha_fin,
        id_aseguradora,
        prima_neta,
        iva,
        gastos_expedicion,
        beneficiario,
        data,
        coberturas
      });

      return poliza;
    } catch (error) {
      this.logger.error('Error al crear póliza');
      throw new ApplicationError('Error al crear póliza: ' + (error as Error).message);
    }
  };

  // Obtener todas las pólizas
  getAllPolizas = async () => {
    try {
      const polizas = await Poliza.findAll();
      return polizas;
    } catch (error) {
      this.logger.error('Error al obtener pólizas');
      throw new ApplicationError('Error al obtener pólizas: ' + (error as Error).message);
    }
  };

  // Obtener pólizas por usuario
  getPolizasByUser = async (userId: number) => {
    try {
      const polizas = await Poliza.findAll({
        where: { id_user: userId }
      });
      return polizas;
    } catch (error) {
      this.logger.error('Error al obtener pólizas del usuario');
      throw new ApplicationError('Error al obtener pólizas del usuario: ' + (error as Error).message);
    }
  };

  // Obtener una póliza por ID
  getPolizaById = async (id: number) => {
    try {
      const poliza = await Poliza.findByPk(id);
      if (!poliza) {
        throw new ApplicationError(`Póliza con ID ${id} no encontrada`);
      }
      return poliza;
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      }
      this.logger.error('Error al obtener póliza por ID');
      throw new ApplicationError('Error al obtener póliza: ' + (error as Error).message);
    }
  };

  // Actualizar una póliza
  updatePoliza = async (id: number, polizaData: Partial<Poliza>) => {
    try {
      const poliza = await Poliza.findByPk(id);
      if (!poliza) {
        throw new ApplicationError(`Póliza con ID ${id} no encontrada`);
      }
      
      await poliza.update(polizaData);
      return poliza;
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      }
      this.logger.error('Error al actualizar póliza');
      throw new ApplicationError('Error al actualizar póliza: ' + (error as Error).message);
    }
  };

  // Eliminar una póliza
  deletePoliza = async (id: number) => {
    try {
      const poliza = await Poliza.findByPk(id);
      if (!poliza) {
        throw new ApplicationError(`Póliza con ID ${id} no encontrada`);
      }
      
      await poliza.destroy();
      return { message: 'Póliza eliminada exitosamente' };
    } catch (error) {
      if (error instanceof ApplicationError) {
        throw error;
      }
      this.logger.error('Error al eliminar póliza');
      throw new ApplicationError('Error al eliminar póliza: ' + (error as Error).message);
    }
  };
} 