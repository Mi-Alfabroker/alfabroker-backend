import { Table, Model, Column, DataType, BeforeCreate, BeforeUpdate, HasMany } from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

export enum UserStatus {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo'
}

export enum UserType {
  CLIENTE = 'cliente',
  AGENTE = 'agente',
  ADMIN = 'admin'
}

export enum PersonType {
  JURIDICA = 'Juridica',
  NATURAL = 'Natural'
}

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion'
})
export default class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: true
  })
  id_user!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  password!: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserStatus)),
    allowNull: false,
    defaultValue: UserStatus.ACTIVO
  })
  estado!: UserStatus;

  @Column({
    type: DataType.ENUM(...Object.values(UserType)),
    allowNull: false
  })
  type!: UserType;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  nombre!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true
  })
  telefono!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  direccion!: string;

  @Column({
    type: DataType.ENUM(...Object.values(PersonType)),
    allowNull: true
  })
  tipo_persona!: PersonType;

  // Hooks para el hash del password
  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.changed('password')) {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  // Método para comparar passwords
  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  // Método para serializar el usuario (eliminar datos sensibles)
  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  }
}
