import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user';
import { DatosPoliza, Beneficiario } from '../types/polizas';
import { CoberturaAseguradora } from '../types/aseguradora';

export enum TipoPoliza {
  COPROPIEDADES = 'copropiedades',
  HOGAR = 'hogar',
  VEHICULOS = 'vehiculos',
  PYME = 'pyme',
  MASCOTAS = 'mascotas',
  AP = 'ap',
  TRANSPORTES = 'transportes',
  ARRENDAMIENTO = 'arrendamiento',
  SALUD = 'salud',
  VIDA = 'vida',
  RCE = 'rce',
  ARL = 'arl'
}

@Table({
  tableName: 'polizas',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion'
})
export default class Poliza extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  id_user!: number;

  @Column({
    type: DataType.ENUM(...Object.values(TipoPoliza)),
    allowNull: false
  })
  tipo_poliza!: TipoPoliza;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  fecha_inicio!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  fecha_fin!: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  id_aseguradora!: number;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0
  })
  iva!: number;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false
  })
  prima_neta!: number;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0
  })
  gastos_expedicion!: number;

  @Column({
    type: DataType.JSONB,
    allowNull: true
  })
  beneficiario!: Beneficiario | null;

  @Column({
    type: DataType.JSONB,
    allowNull: true
  })
  data!: DatosPoliza;

  
  @Column({
    type: DataType.JSONB,
    allowNull: true
  })
  coberturas!: CoberturaAseguradora[];

  @BelongsTo(() => User)
  usuario!: User;
} 