'use strict';

const permissions = [
  ['users.read', 'Read users', 'users'],
  ['users.create', 'Create users', 'users'],
  ['users.update', 'Update users', 'users'],
  ['users.delete', 'Delete users', 'users'],
  ['products.read', 'Read products', 'products'],
  ['products.create', 'Create products', 'products'],
  ['products.update', 'Update products', 'products'],
  ['products.delete', 'Delete products', 'products'],
  ['orders.read', 'Read orders', 'orders'],
  ['orders.create', 'Create orders', 'orders'],
  ['orders.update', 'Update orders', 'orders'],
  ['orders.delete', 'Delete orders', 'orders'],
  ['customers.read', 'Read customers', 'customers'],
  ['customers.create', 'Create customers', 'customers'],
  ['customers.update', 'Update customers', 'customers'],
  ['customers.delete', 'Delete customers', 'customers'],
  ['categories.read', 'Read categories', 'categories'],
  ['categories.create', 'Create categories', 'categories'],
  ['categories.update', 'Update categories', 'categories'],
  ['categories.delete', 'Delete categories', 'categories'],
  ['suppliers.read', 'Read suppliers', 'suppliers'],
  ['suppliers.create', 'Create suppliers', 'suppliers'],
  ['suppliers.update', 'Update suppliers', 'suppliers'],
  ['suppliers.delete', 'Delete suppliers', 'suppliers'],
];

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert(
      'permissions',
      permissions.map(([name, label, module], index) => ({
        id: index + 1,
        name,
        label,
        module,
        created_at: now,
        updated_at: now,
      })),
    );

    await queryInterface.sequelize.query(
      "SELECT setval(pg_get_serial_sequence('permissions', 'id'), (SELECT MAX(id) FROM permissions));",
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('permissions', {
      name: permissions.map(([name]) => name),
    });
  },
};
