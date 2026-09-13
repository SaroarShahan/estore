'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('roles', [
      { id: 1, name: 'admin', created_at: now, updated_at: now },
      { id: 2, name: 'manager', created_at: now, updated_at: now },
      { id: 3, name: 'customer', created_at: now, updated_at: now },
    ]);

    await queryInterface.sequelize.query(
      "SELECT setval(pg_get_serial_sequence('roles', 'id'), (SELECT MAX(id) FROM roles));",
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', {
      name: ['admin', 'manager', 'customer'],
    });
  },
};
