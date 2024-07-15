'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {
    // Insert 20 message records
    await queryInterface.bulkInsert('message', [
      ...Array.from({ length: 20 }).map((_, index) => ({
        content: `Sample message content ${index + 1}`,
        userId: Math.floor(Math.random() * 10) + 1, // assuming there are 10 users
        courseId: Math.floor(Math.random() * 5) + 1, // assuming there are 5 courses
      }))
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('message');
    console.log('table message dropped successfully.');
  }
};
