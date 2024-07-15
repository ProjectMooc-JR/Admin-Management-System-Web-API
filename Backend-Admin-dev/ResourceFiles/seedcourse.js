const { sequelize } = require("../db/sequelizedb");
const course = require("../model/course");
// const { error } = require("winston");

const courses = [
    {
        'courseName': 'Test1',
        'courseDescription': 'TestDescription1',
        'courseCategoryId': 4,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test2',
        'courseDescription': 'TestDescription2',
        'courseCategoryId': 8,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test3',
        'courseDescription': 'TestDescription3',
        'courseCategoryId': 5,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test4',
        'courseDescription': 'TestDescription4',
        'courseCategoryId': 5,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test5',
        'courseDescription': 'TestDescription5',
        'courseCategoryId': 7,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test6',
        'courseDescription': 'TestDescription6',
        'courseCategoryId': 4,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test7',
        'courseDescription': 'TestDescription7',
        'courseCategoryId': 2,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test8',
        'courseDescription': 'TestDescription8',
        'courseCategoryId': 10,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test9',
        'courseDescription': 'TestDescription9',
        'courseCategoryId': 9,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test10',
        'courseDescription': 'TestDescription10',
        'courseCategoryId': 19,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test11',
        'courseDescription': 'TestDescription11',
        'courseCategoryId': 17,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test12',
        'courseDescription': 'TestDescription12',
        'courseCategoryId': 15,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test13',
        'courseDescription': 'TestDescription13',
        'courseCategoryId': 17,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test14',
        'courseDescription': 'TestDescription14',
        'courseCategoryId': 2,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test15',
        'courseDescription': 'TestDescription15',
        'courseCategoryId': 9,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test16',
        'courseDescription': 'TestDescription16',
        'courseCategoryId': 13,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test17',
        'courseDescription': 'TestDescription17',
        'courseCategoryId': 7,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test18',
        'courseDescription': 'TestDescription18',
        'courseCategoryId': 3,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test19',
        'courseDescription': 'TestDescription19',
        'courseCategoryId': 2,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test20',
        'courseDescription': 'TestDescription20',
        'courseCategoryId': 19,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test21',
        'courseDescription': 'TestDescription21',
        'courseCategoryId': 24,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test22',
        'courseDescription': 'TestDescription22',
        'courseCategoryId': 1,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test23',
        'courseDescription': 'TestDescription23',
        'courseCategoryId': 6,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test24',
        'courseDescription': 'TestDescription24',
        'courseCategoryId': 12,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test25',
        'courseDescription': 'TestDescription25',
        'courseCategoryId': 1,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test26',
        'courseDescription': 'TestDescription26',
        'courseCategoryId': 7,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test27',
        'courseDescription': 'TestDescription27',
        'courseCategoryId': 23,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test28',
        'courseDescription': 'TestDescription28',
        'courseCategoryId': 16,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test29',
        'courseDescription': 'TestDescription29',
        'courseCategoryId': 6,
        'courseCover': 'TBD',
        'teacherId': null
    },
    {
        'courseName': 'Test30',
        'courseDescription': 'TestDescription30',
        'courseCategoryId': 20,
        'courseCover': 'TBD',
        'teacherId': null
    }
]

// course.bulkCreate(courses)
// .then(result => {
//     console.log("Courses Created Successfully", result);
// })
// .catch(error => {
//     console.log("Failed to Create Courses", error);
// });

// create table course if not exists
const insertCourses = async () => {
    try {
        await sequelize.sync();

        const result = await course.bulkCreate(courses);
        console.log("Courses Created Successfully", result);
    } catch (error) {
        console.log("Failed to Create Courses", error);
    }
};

// insertCourses();

module.exports = insertCourses;