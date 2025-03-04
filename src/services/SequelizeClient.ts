import { Sequelize } from 'sequelize-typescript';
import {
  User,
  Poliza,
} from '../models';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'alfabroker',
  logging: false,
  models: [User, Poliza],
});

export default sequelize;
