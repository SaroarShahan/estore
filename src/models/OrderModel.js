const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderModel extends Model {
    static associate(models) {
      OrderModel.belongsTo(models.CustomerModel, {
        foreignKey: 'customerId',
        as: 'customer',
      });

      OrderModel.hasMany(models.OrderItemModel, {
        foreignKey: 'orderId',
        as: 'items',
      });
    }
  }

  OrderModel.init(
    {
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id',
        },
      },

      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },

      totalAmount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'OrderModel',
      tableName: 'orders',
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  );

  return OrderModel;
};
