'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('suppliers', [
      {
        id: 1,
        name: 'TechSource Ltd.',
        email: 'sales@techsource.example.com',
        phone: '+8801700000001',
        address: 'Gulshan, Dhaka, Bangladesh',
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: 2,
        name: 'StyleHub Wholesale',
        email: 'orders@stylehub.example.com',
        phone: '+8801700000002',
        address: 'Banani, Dhaka, Bangladesh',
        is_active: true,
        created_at: now,
        updated_at: now,
      },
      {
        id: 3,
        name: 'HomeCraft Supply',
        email: 'hello@homecraft.example.com',
        phone: '+8801700000003',
        address: 'Uttara, Dhaka, Bangladesh',
        is_active: true,
        created_at: now,
        updated_at: now,
      },
    ]);

    await queryInterface.sequelize.query(
      "SELECT setval(pg_get_serial_sequence('suppliers', 'id'), (SELECT MAX(id) FROM suppliers));",
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('suppliers', {
      id: [1, 2, 3],
    });
  },
};
