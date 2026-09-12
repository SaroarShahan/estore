const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductModel extends Model {
    static associate(models) {
      models.ProductModel.belongsTo(models.CategoryModel, {
        foreignKey: 'categoryId',
        as: 'category',
      });
      models.ProductModel.belongsTo(models.SupplierModel, {
        foreignKey: 'supplierId',
        as: 'supplier',
      });
      models.ProductModel.belongsTo(models.UserModel, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  ProductModel.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      sku: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      productImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,

        validate: {
          min: 0,
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'suppliers',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'ProductModel',
      tableName: 'products',
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  );

  return ProductModel;
};
