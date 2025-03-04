import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { UserStatus, UserType, PersonType } from '../models/user';

export class SignUpRequest {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(UserStatus)
  estado: UserStatus = UserStatus.ACTIVO;

  @IsEnum(UserType)
  type: UserType = UserType.CLIENTE;

  telefono?: string;

  direccion?: string;

  @IsEnum(PersonType)
  tipo_persona?: PersonType;
}
