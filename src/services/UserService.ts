import { ApplicationError } from '../utils/ApiError';
import { Service } from 'typedi';
import { LoggerClient } from './LoggerClient';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../utils/ApiError';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

@Service()
export default class UserService {
  constructor(public logger: LoggerClient) {}

  private excludePassword(user: User) {
    const userJson = user.toJSON();
    delete userJson.password;
    return userJson;
  }

  signUp = async (
    nombre: string,
    email: string,
    password: string,
    estado: 'active' | 'inactive',
    type: 'admin' | 'agent'
  ) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ApplicationError('Email already exists');
    }

    const user = await User.create({
      nombre,
      email,
      password,
      estado,
      type
    });
    
    return this.excludePassword(user);
  };

  signIn = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestError('Usuario no encontrado', ['USER_NOT_FOUND']);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new BadRequestError('Contraseña inválida', ['INVALID_PASSWORD']);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, type: user.type },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      token,
      user: this.excludePassword(user)
    };
  };

  getAllUsers = async () => {
    const users = await User.findAll();
    return users.map(user => this.excludePassword(user));
  };

  getUserById = async (id: number) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new BadRequestError('Usuario no encontrado', ['USER_NOT_FOUND']);
    }
    return this.excludePassword(user);
  };

  updateUser = async (id: number, userData: Partial<User>) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new BadRequestError('Usuario no encontrado', ['USER_NOT_FOUND']);
    }
    
    await user.update(userData);
    return this.excludePassword(user);
  };

  deleteUser = async (id: number) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new BadRequestError('Usuario no encontrado', ['USER_NOT_FOUND']);
    }
    
    await user.destroy();
    return { message: 'Usuario eliminado exitosamente' };
  };
}
