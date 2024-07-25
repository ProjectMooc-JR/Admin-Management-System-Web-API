'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(255),
      },
      age: {
        type: Sequelize.INTEGER,
      },
      gender: {
        type: Sequelize.INTEGER,
      },
      avatar: {
        type: Sequelize.STRING(255), 
        allowNull: true, // Allow null because avatar might not be provided initially
      },
      nickname: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      access: {
        type:Sequelize.ENUM('teacher', 'student', 'admin'),
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        // allowNull: false,
        defaultValue: true,
      },
    });
    console.log("table user created");
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
