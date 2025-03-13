import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { CoberturaAseguradora, ComisionAseguradora } from '../types/aseguradora';
import Poliza from './poliza';

@Table({
  tableName: 'aseguradoras',
  timestamps: true
})
export default class Aseguradora extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  nombre!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  telefono!: string;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
    defaultValue: []
  })
  cobertura!: CoberturaAseguradora[];

  @Column({
    type: DataType.JSONB,
    allowNull: false,
    defaultValue: []
  })
  comisiones!: ComisionAseguradora[];

  @HasMany(() => Poliza)
  polizas!: Poliza[];
} 