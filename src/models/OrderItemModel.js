const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderItemModel extends Model {
    static associate(models) {
      OrderItemModel.belongsTo(models.OrderModel, {
        foreignKey: 'orderId',
        as: 'order',
      });

      OrderItemModel.belongsTo(models.ProductModel, {
        foreignKey: 'productId',
        as: 'product',
      });
    }
  }

  OrderItemModel.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id',
        },
      },

      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      unitPrice: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },

      subtotal: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'OrderItemModel',
      tableName: 'order_items',
      timestamps: true,
      underscored: true,
      paranoid: true,
    },
  );

  return OrderItemModel;
};
