const { sequelize } = require('../db/sequelizedb.js');
const CourseCategory = require('../model/coursecategory.js');

const courseCategories = [
    { categoryname: 'Frontend Development', categorylevel: 1, categoryparentid: 0, remark: 'This is a sub-category of Web Development.' },
    { categoryname: 'Backend Development', categorylevel: 1, categoryparentid: 0, remark: 'This is a sub-category of Web Development.' },
    { categoryname: 'HTML & CSS', categorylevel: 2, categoryparentid: 1, remark: 'Basics for Frontend Development.' },
    { categoryname: 'JavaScript', categorylevel: 2, categoryparentid: 1, remark: 'Essential for Web Development.' },
    { categoryname: 'React', categorylevel: 2, categoryparentid: 1, remark: 'A popular JavaScript library for building user interfaces.' },
    { categoryname: 'Node.js', categorylevel: 2, categoryparentid: 2, remark: 'JavaScript runtime for building server-side applications.' },
    { categoryname: 'Express', categorylevel: 3, categoryparentid: 2, remark: 'Web application framework for Node.js.' },
    { categoryname: 'Databases', categorylevel: 1, categoryparentid: 0, remark: 'Storage for application data.' },
    { categoryname: 'MongoDB', categorylevel: 2, categoryparentid: 7, remark: 'NoSQL database for modern applications.' },
    { categoryname: 'MySQL', categorylevel: 2, categoryparentid: 7, remark: 'Relational database management system.' },
    { categoryname: 'PostgreSQL', categorylevel: 2, categoryparentid: 7, remark: 'Open source relational database.' },
    { categoryname: 'Cloud Computing', categorylevel: 1, categoryparentid: 0, remark: 'On-demand computing resources over the internet.' },
    { categoryname: 'AWS', categorylevel: 2, categoryparentid: 11, remark: 'Comprehensive cloud services platform.' },
    { categoryname: 'Azure', categorylevel: 2, categoryparentid: 11, remark: 'Cloud computing service created by Microsoft.' },
    { categoryname: 'Google Cloud', categorylevel: 2, categoryparentid: 11, remark: 'Suite of cloud computing services by Google.' },
    { categoryname: 'DevOps', categorylevel: 1, categoryparentid: 0, remark: 'Practices for collaboration and productivity.' },
    { categoryname: 'Docker', categorylevel: 2, categoryparentid: 15, remark: 'Platform for developing, shipping, and running applications.' },
    { categoryname: 'Kubernetes', categorylevel: 2, categoryparentid: 15, remark: 'Automate deployment, scaling, and management of containerized applications.' },
    { categoryname: 'CI/CD', categorylevel: 2, categoryparentid: 15, remark: 'Continuous integration and continuous delivery.' },
    { categoryname: 'Testing', categorylevel: 1, categoryparentid: 0, remark: 'Ensuring software quality.' },
    { categoryname: 'Unit Testing', categorylevel: 2, categoryparentid: 19, remark: 'Testing individual units of source code.' },
    { categoryname: 'Integration Testing', categorylevel: 2, categoryparentid: 19, remark: 'Testing combined parts of an application.' },
    { categoryname: 'E2E Testing', categorylevel: 2, categoryparentid: 19, remark: 'Testing the entire application from start to finish.' },
    { categoryname: 'UI/UX Design', categorylevel: 1, categoryparentid: 0, remark: 'Designing user interfaces and experiences.' },
    { categoryname: 'Figma', categorylevel: 2, categoryparentid: 23, remark: 'Interface design tool.' },
    { categoryname: 'Sketch', categorylevel: 2, categoryparentid: 23, remark: 'Digital design toolkit.' }
];

const insertCourseCategories = async () => {
    try {
        await sequelize.sync();
        for (const category of courseCategories) {
            await CourseCategory.create(category);
        }
        console.log('Course categories have been inserted successfully.');
    } catch (error) {
        console.error('Failed to insert course categories:', error);
    }
};

// insertCourseCategories();

module.exports = insertCourseCategories;