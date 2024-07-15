'use strict';
const { QueryTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtain course ids to ensure they exist in the course table
    const courses = await queryInterface.sequelize.query(
      'SELECT courseId FROM course;',
      { type: QueryTypes.SELECT }
    );

    // If there are no courses, don't seed schedules
    if (!courses.length) return;

    // Function to generate random date within January 2024
    const randomDateInJanuary2024 = () => {
      const day = Math.floor(Math.random() * 31) + 1; // Random day in January
      const hour = Math.floor(Math.random() * 12) + 8; // Random hour from 8 AM to 8 PM
      return new Date(2024, 0, day, hour, 0, 0); // Year 2024, January, random day, random hour
    };

    // Insert seed data for course schedules
    await queryInterface.bulkInsert('courseschedule', [
      ...courses.map(course => {
        const startTime = randomDateInJanuary2024();
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // End time is 1 hour after start time
        return {
          startTime: startTime,
          endTime: endTime,
          isPublished: false, // Randomly publish about half the schedules
          courseId: course.courseId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    ]);
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courseSchedule');
    console.log('table message dropped successfully.');
  }
};
