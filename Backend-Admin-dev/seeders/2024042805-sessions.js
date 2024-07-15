'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    let sessionsData = [
      { courseId: 1, title: 'Introduction to Test1', description: 'Session 1 Description', mediaUrl: 'http://res.cloudinary.com/dvaeob3pw/video/upload/v1715572008/Mooc/courses/1/sessions/1/4124024-uhd_4096_2160_25fps_kztih7.mp4' },
      { courseId: 1, title: 'Advanced Topics in Test1', description: 'Session 2 Description', mediaUrl: '' },
      { courseId: 2, title: 'Introduction to Test2', description: 'Session 1 Description', mediaUrl: '' },
      { courseId: 2, title: 'Advanced Topics in Test2', description: 'Session 2 Description', mediaUrl: '' },
      { courseId: 3, title: 'Introduction to Test3', description: 'Session 1 Description', mediaUrl: '' },
      { courseId: 3, title: 'Advanced Topics in Test3', description: 'Session 2 Description', mediaUrl: '' },
    ];

    const totalCourses = 5;
    const sessionsPerCourse = 5;

    for (let courseId = 1; courseId <= totalCourses; courseId++) {
      let currentSessionsForCourse = sessionsData.filter(session => session.courseId === courseId).length;
      let sessionsToAdd = sessionsPerCourse - currentSessionsForCourse;

      for (let j = 1; j <= sessionsToAdd; j++) {
        sessionsData.push({
          courseId: courseId,
          title: `Session ${currentSessionsForCourse + j} of Course ${courseId}`,
          description: `Description for session ${currentSessionsForCourse + j} of course ${courseId}`,
          mediaUrl: "",
        });
      }
    }

    await queryInterface.bulkInsert('session', sessionsData, {});
    console.log('sessions seeded successfully.');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('session');
    console.log('sessions table dropped successfully.');
  }
};
