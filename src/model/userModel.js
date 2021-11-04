module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'User',
    {
      idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BIGINT,
      },
      isConfirmed: {
        type: DataTypes.BIGINT,
      },
      createdAt: {
        type: 'TIMESTAMP',
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },

      registeredBy: {
        type: DataTypes.INTEGER,
      },
      Role_idRole: {
        type: DataTypes.INTEGER,
      },
      Client_idClient: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Client',
          key: 'idClient',
        },
      },
      Company_idCompany: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Company',
          key: 'idCompany',
        },
      },
      Administrator_idAdministrator: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Administrator',
          key: 'idAdministrator',
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        defaultValue: null,
      },
    },
    {
      tableName: 'User',
    }
  );
};
