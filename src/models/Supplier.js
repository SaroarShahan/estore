const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SupplierModel extends Model {
    static associate(models) {
      SupplierModel.hasMany(models.ProductModel, {
        foreignKey: 'supplierId',
        as: 'products',
      });
    }
  }

  SupplierModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,

        validate: {
          isEmail: true,
        },
      },

      phone: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },

      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'SupplierModel',
      tableName: 'suppliers',
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  );

  return SupplierModel;
};
