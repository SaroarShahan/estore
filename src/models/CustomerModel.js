const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CustomerModel extends Model {
    static associate(models) {
      CustomerModel.hasMany(models.OrderModel, {
        foreignKey: 'customerId',
        as: 'orders',
      });
    }
  }

  CustomerModel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'CustomerModel',
      tableName: 'customers',
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  );

  return CustomerModel;
};
