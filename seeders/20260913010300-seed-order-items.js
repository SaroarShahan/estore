'use strict';

const basePrices = [24.99, 39.99, 18.5, 14.5, 54.99, 69.99, 49.99, 29.99, 34.5];

const getProductPrice = (productId) => {
  const productIndex = productId - 1;
  const basePrice = basePrices[productIndex % basePrices.length];
  const variant = Math.floor(productIndex / basePrices.length) + 1;

  return Number((basePrice + variant * 1.75).toFixed(2));
};

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const orderItems = Array.from({ length: 500 }, (_, index) => {
      const orderId = index + 1;
      const firstProductId = ((index * 2) % 200) + 1;
      const secondProductId = (firstProductId % 200) + 1;
      const firstQuantity = (index % 3) + 1;
      const secondQuantity = (index % 2) + 1;
      const firstUnitPrice = getProductPrice(firstProductId);
      const secondUnitPrice = getProductPrice(secondProductId);

      return [
        {
          id: index * 2 + 1,
          order_id: orderId,
          product_id: firstProductId,
          quantity: firstQuantity,
          unit_price: firstUnitPrice,
          subtotal: Number((firstUnitPrice * firstQuantity).toFixed(2)),
          created_at: now,
          updated_at: now,
        },
        {
          id: index * 2 + 2,
          order_id: orderId,
          product_id: secondProductId,
          quantity: secondQuantity,
          unit_price: secondUnitPrice,
          subtotal: Number((secondUnitPrice * secondQuantity).toFixed(2)),
          created_at: now,
          updated_at: now,
        },
      ];
    }).flat();

    await queryInterface.bulkInsert('order_items', orderItems);

    await queryInterface.sequelize.query(
      "SELECT setval(pg_get_serial_sequence('order_items', 'id'), (SELECT MAX(id) FROM order_items));",
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('order_items', {
      id: Array.from({ length: 1000 }, (_, index) => index + 1),
    });
  },
};
