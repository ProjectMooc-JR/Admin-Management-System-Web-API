const insertCourseCategories = require('./seedCourseCategories.js');
const insertCourses = require('./seedcourse.js');
const insertSessions = require('./seedSession.js');
const { sequelize } = require('../db/sequelizedb.js');

const seedTeam2All = async () => {
    await insertCourseCategories();
    await insertCourses();
    await insertSessions();
    console.log('Seed Team 2 All Completed');
    await sequelize.close();
}

seedTeam2All();