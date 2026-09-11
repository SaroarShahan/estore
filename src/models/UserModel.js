const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserModel extends Model {}

  UserModel.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'username',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive', 'blocked'),
        defaultValue: 'active',
      },
    },
    {
      sequelize,
      modelName: 'UserModel',
      tableName: 'users',
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  );

  return UserModel;
};
