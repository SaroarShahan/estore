'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(100),
      },
      label: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      module: {
        allowNull: false,
        type: Sequelize.STRING(100),
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable('permissions');
  },
};
