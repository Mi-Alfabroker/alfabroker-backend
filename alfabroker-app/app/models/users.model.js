export default (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Genera un UUID automáticamente
        allowNull: false,
        primaryKey: true,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // El email debe ser único
        validate: {
          isEmail: true, // Valida que sea un correo electrónico válido
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('admin', 'user', 'editor'),
        defaultValue: 'user',
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'suspended'),
        defaultValue: 'active',
        allowNull: false,
      },
    }, {
      timestamps: true, // Agrega automáticamente createdAt y updatedAt
    });
  
    return User;
  };
  