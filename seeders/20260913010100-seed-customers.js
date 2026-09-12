'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const customers = Array.from({ length: 50 }, (_, index) => {
      const id = index + 1;

      return {
        id,
        name: `Customer ${id}`,
        email: `customer${id}@example.com`,
        phone: `+1-555-${String(1000 + id).slice(-4)}`,
        address: `${id} Main Street, New York, NY`,
        created_at: now,
        updated_at: now,
      };
    });

    await queryInterface.bulkInsert('customers', customers);

    await queryInterface.sequelize.query(
      "SELECT setval(pg_get_serial_sequence('customers', 'id'), (SELECT MAX(id) FROM customers));",
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('customers', {
      email: Array.from({ length: 50 }, (_, index) => `customer${index + 1}@example.com`),
    });
  },
};
