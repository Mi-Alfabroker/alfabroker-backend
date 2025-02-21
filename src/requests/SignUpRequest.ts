import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';

export class SignUpRequest {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(['active', 'inactive'])
  status: 'active' | 'inactive' = 'active';

  @IsEnum(['admin', 'agent'])
  type: 'admin' | 'agent' = 'agent';
}
