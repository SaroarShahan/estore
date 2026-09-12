'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: 'Electronics',
        description: 'Devices, gadgets, and electronic accessories.',
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        name: 'Fashion',
        description: 'Clothing, footwear, and personal accessories.',
        created_at: now,
        updated_at: now,
      },
      {
        id: 3,
        name: 'Home & Kitchen',
        description: 'Home essentials, kitchen tools, and decor.',
        created_at: now,
        updated_at: now,
      },
    ]);

    await queryInterface.sequelize.query(
      "SELECT setval(pg_get_serial_sequence('categories', 'id'), (SELECT MAX(id) FROM categories));",
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', {
      id: [1, 2, 3],
    });
  },
};
