const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CategoryModel extends Model {
    static associate(models) {
      models.CategoryModel.hasMany(models.ProductModel, {
        foreignKey: 'categoryId',
        as: 'products',
      });
    }
  }

  CategoryModel.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'CategoryModel',
      tableName: 'categories',
      timestamps: true,
      underscored: true,
    },
  );

  return CategoryModel;
};
