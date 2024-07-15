'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coursecategory', {
      categoryid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      categoryname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      categorylevel: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      categoryparentid: {
        type: Sequelize.INTEGER,
        allowNull: false // we can have a category without a parent which categoryparentid is 0
      },
      remark: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    });
    console.log('table coursecategory created');
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
