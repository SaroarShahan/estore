'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'gender', {
      allowNull: false,
      defaultValue: 'other',
      type: Sequelize.ENUM('male', 'female', 'other'),
    });

    await queryInterface.addColumn('users', 'role_id', {
      allowNull: true,
      type: Sequelize.BIGINT,
      references: {
        model: 'roles',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.changeColumn('users', 'gender', {
      allowNull: false,
      type: Sequelize.ENUM('male', 'female', 'other'),
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'role_id');
    await queryInterface.removeColumn('users', 'gender');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_gender";');
  },
};
