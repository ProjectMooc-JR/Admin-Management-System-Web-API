const { sequelize } = require("../db/sequelizedb");
const Session = require("../model/session"); 

let sessionsData = [
    { courseId: 1, title: 'Introduction to Test1', description: 'Session 1 Description', mediaUrl: 'http://example.com/video1.mp4' },
    { courseId: 1, title: 'Advanced Topics in Test1', description: 'Session 2 Description', mediaUrl: 'http://example.com/video2.mp4' },
    { courseId: 2, title: 'Introduction to Test2', description: 'Session 1 Description', mediaUrl: 'http://example.com/video3.mp4' },
    { courseId: 2, title: 'Advanced Topics in Test2', description: 'Session 2 Description', mediaUrl: 'http://example.com/video4.mp4' },
    { courseId: 3, title: 'Introduction to Test3', description: 'Session 1 Description', mediaUrl: 'http://example.com/video5.mp4' },
    { courseId: 3, title: 'Advanced Topics in Test3', description: 'Session 2 Description', mediaUrl: 'http://example.com/video6.mp4' },
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
            mediaUrl: `http://example.com/video${sessionsData.length + 1}.mp4`
        });
    }
}

const insertSessions = async () => {
    try {
        await sequelize.sync();

        const result = await Session.bulkCreate(sessionsData);
        console.log("Sessions Created Successfully", result.length, "sessions added.");
    } catch (error) {
        console.log("Failed to Create Sessions", error);
    }
};

//insertSessions();


module.exports = insertSessions;
