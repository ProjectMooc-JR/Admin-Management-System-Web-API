'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('course', {
      courseId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      courseName: Sequelize.STRING,
      courseDescription: Sequelize.TEXT,
      courseCategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'coursecategory',
          key: 'categoryid',
        },
        onDelete: 'CASCADE', // if course category is deleted, delete all courses in that category
        onUpdate: 'CASCADE'
      },
      courseCover: Sequelize.STRING,
      teacherId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'teacher',
          key: 'id'
        },
        onDelete: 'SET NULL'
      }
    });
    console.log('table course created');
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
