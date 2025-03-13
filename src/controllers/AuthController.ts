import { Request } from 'express';
import UserService from '../services/UserService';
import { asyncWrapper } from '../utils/asyncWrapper';
import { SuccessResponse } from '../utils/SuccessResponse';
import { Service } from 'typedi';

@Service()
export default class AuthController {
  
  constructor(public userService: UserService) {}

  signIn = asyncWrapper(async (req: Request) => {
    const { email, password } = req.body;
    const response = await this.userService.signIn(email, password);
    return new SuccessResponse(response);
  });

  signUp = asyncWrapper(async (req: Request) => {
    const { nombre, email, password, estado, type } = req.body;
    const response = await this.userService.signUp(
      nombre,
      email,
      password,
      estado || 'active',
      type || 'agent'
    );
    return new SuccessResponse(response);
  });

  getAllUsers = asyncWrapper(async () => {
    const response = await this.userService.getAllUsers();
    return new SuccessResponse(response);
  });

  getUserById = asyncWrapper(async (req: Request) => {
    const { id } = req.params;
    const user = await this.userService.getUserById(Number(id));
    
    // Devolver solo la información básica del usuario
    const basicUserInfo = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      estado: user.estado,
      type: user.type
    };
    
    return new SuccessResponse(basicUserInfo);
  });
}
