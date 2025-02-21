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
    const { username, email, password, status, type } = req.body;
    const response = await this.userService.signUp(
      username,
      email,
      password,
      status || 'active',
      type || 'agent'
    );
    return new SuccessResponse(response);
  });

  getAllUsers = asyncWrapper(async () => {
    const response = await this.userService.getAllUsers();
    return new SuccessResponse(response);
  });
}
