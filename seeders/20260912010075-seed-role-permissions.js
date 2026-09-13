'use strict';

const permissionCount = 24;

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const rolePermissions = [];

    for (let permissionId = 1; permissionId <= permissionCount; permissionId += 1) {
      rolePermissions.push({
        id: rolePermissions.length + 1,
        role_id: 1,
        permission_id: permissionId,
        created_at: now,
        updated_at: now,
      });
    }

    for (let permissionId = 1; permissionId <= permissionCount; permissionId += 1) {
      if (permissionId % 4 !== 0) {
        rolePermissions.push({
          id: rolePermissions.length + 1,
          role_id: 2,
          permission_id: permissionId,
          created_at: now,
          updated_at: now,
        });
      }
    }

    for (const permissionId of [5, 9, 10, 13]) {
      rolePermissions.push({
        id: rolePermissions.length + 1,
        role_id: 3,
        permission_id: permissionId,
        created_at: now,
        updated_at: now,
      });
    }

    await queryInterface.bulkInsert('role_permissions', rolePermissions);

    await queryInterface.sequelize.query(
      "SELECT setval(pg_get_serial_sequence('role_permissions', 'id'), (SELECT MAX(id) FROM role_permissions));",
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('role_permissions', {
      id: Array.from({ length: 46 }, (_, index) => index + 1),
    });
  },
};
