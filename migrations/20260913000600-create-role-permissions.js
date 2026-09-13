'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      role_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      permission_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'permissions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('role_permissions', {
      fields: ['role_id', 'permission_id'],
      type: 'unique',
      name: 'role_permissions_role_id_permission_id_unique',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('role_permissions');
  },
};
