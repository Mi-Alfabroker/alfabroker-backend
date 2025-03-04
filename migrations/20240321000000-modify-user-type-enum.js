const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface) {
    // En PostgreSQL, necesitamos hacer esto en varios pasos
    if (queryInterface.sequelize.getDialect() === "postgres") {
      // 1. Limpiar tipos enum existentes que pudieran haber quedado de intentos anteriores
      await queryInterface.sequelize.query(`
        DROP TYPE IF EXISTS "enum_users_type_new";
      `);

      // 2. Eliminar el valor por defecto temporalmente
      await queryInterface.sequelize.query(`
        ALTER TABLE users ALTER COLUMN type DROP DEFAULT;
      `);

      // 3. Crear un nuevo tipo enum
      await queryInterface.sequelize.query(`
        CREATE TYPE "enum_users_type_new" AS ENUM ('admin', 'client', 'agent');
      `);

      // 4. Actualizar registros existentes
      await queryInterface.sequelize.query(`
        UPDATE users 
        SET type = 'agent' 
        WHERE type NOT IN ('admin', 'client', 'agent');
      `);

      // 5. Convertir la columna al nuevo tipo
      await queryInterface.sequelize.query(`
        ALTER TABLE users 
        ALTER COLUMN type TYPE "enum_users_type_new" 
        USING type::text::"enum_users_type_new";
      `);

      // 6. Establecer el nuevo valor por defecto
      await queryInterface.sequelize.query(`
        ALTER TABLE users ALTER COLUMN type SET DEFAULT 'agent';
      `);

      // 7. Eliminar el antiguo tipo enum
      await queryInterface.sequelize.query(`
        DROP TYPE IF EXISTS "enum_users_type";
      `);

      // 8. Renombrar el nuevo tipo enum
      await queryInterface.sequelize.query(`
        ALTER TYPE "enum_users_type_new" RENAME TO "enum_users_type";
      `);
    } else {
      await queryInterface.changeColumn("users", "type", {
        type: DataTypes.ENUM("admin", "client", "agent"),
        allowNull: false,
        defaultValue: "agent"
      });
    }
  },

  async down(queryInterface) {
    if (queryInterface.sequelize.getDialect() === "postgres") {
      // 1. Limpiar tipos enum existentes
      await queryInterface.sequelize.query(`
        DROP TYPE IF EXISTS "enum_users_type_new";
      `);

      // 2. Eliminar el valor por defecto
      await queryInterface.sequelize.query(`
        ALTER TABLE users ALTER COLUMN type DROP DEFAULT;
      `);

      // 3. Crear el tipo enum anterior
      await queryInterface.sequelize.query(`
        CREATE TYPE "enum_users_type_new" AS ENUM ('admin', 'agent', 'client');
      `);

      // 4. Convertir la columna al tipo anterior
      await queryInterface.sequelize.query(`
        ALTER TABLE users 
        ALTER COLUMN type TYPE "enum_users_type_new" 
        USING type::text::"enum_users_type_new";
      `);

      // 5. Establecer el valor por defecto anterior
      await queryInterface.sequelize.query(`
        ALTER TABLE users ALTER COLUMN type SET DEFAULT 'agent';
      `);

      // 6. Eliminar el tipo enum actual
      await queryInterface.sequelize.query(`
        DROP TYPE IF EXISTS "enum_users_type";
      `);

      // 7. Renombrar el tipo enum anterior
      await queryInterface.sequelize.query(`
        ALTER TYPE "enum_users_type_new" RENAME TO "enum_users_type";
      `);
    } else {
      await queryInterface.changeColumn("users", "type", {
        type: DataTypes.ENUM("admin", "agent", "client"),
        allowNull: false,
        defaultValue: "agent"
      });
    }
  }
}; 