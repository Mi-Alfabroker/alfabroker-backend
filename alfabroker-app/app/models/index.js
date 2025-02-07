// Importamos Sequelize y la configuración de la base de datos
import { Sequelize } from 'sequelize';
import dbConfig from '../config/db.config.js';  // Asegúrate de que el archivo 'db.config.js' esté en formato ESM
import tutorialModel from './tutorial.model.js';

// Creamos una instancia de Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// Inicializamos el objeto db
const db = {};

// Asignamos Sequelize y la instancia sequelize al objeto db
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importamos el modelo de tutorial de manera dinámica
db.tutorials = tutorialModel(sequelize, Sequelize);

// Exportamos el objeto db con todos los modelos
export default db;
