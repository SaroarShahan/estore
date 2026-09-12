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

    const orders = Array.from({ length: 500 }, (_, index) => {
      const id = index + 1;
      const firstProductId = ((index * 2) % 200) + 1;
      const secondProductId = (firstProductId % 200) + 1;
      const firstQuantity = (index % 3) + 1;
      const secondQuantity = (index % 2) + 1;
      const totalAmount =
        getProductPrice(firstProductId) * firstQuantity +
        getProductPrice(secondProductId) * secondQuantity;

      return {
        id,
        customer_id: (index % 50) + 1,
        status: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'][index % 5],
        total_amount: Number(totalAmount.toFixed(2)),
        created_at: now,
        updated_at: now,
      };
    });

    await queryInterface.bulkInsert('orders', orders);

    await queryInterface.sequelize.query(
      "SELECT setval(pg_get_serial_sequence('orders', 'id'), (SELECT MAX(id) FROM orders));",
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('orders', {
      id: Array.from({ length: 500 }, (_, index) => index + 1),
    });
  },
};
