'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const password = await bcrypt.hash('password123', 12);

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        first_name: 'Saroar',
        last_name: 'Shahan',
        username: 'saroar',
        gender: 'male',
        email: 'saroar@example.com',
        password,
        status: 'active',
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        first_name: 'Admin',
        last_name: 'User',
        username: 'admin',
        gender: 'other',
        email: 'admin@example.com',
        password,
        status: 'active',
        created_at: now,
        updated_at: now,
      },
    ]);

    await queryInterface.sequelize.query(
      "SELECT setval(pg_get_serial_sequence('users', 'id'), (SELECT MAX(id) FROM users));",
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      email: ['saroar@example.com', 'admin@example.com'],
    });
  },
};
