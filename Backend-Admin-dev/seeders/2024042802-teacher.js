"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('teacher', [
            { userId: 3, introduction: "Experienced mathematics teacher with a decade of tutoring.", expertise: "Mathematics", organization: "City College", department: "Math", level: "University" },
            { userId: 4, introduction: "Dedicated physics teacher, specializing in quantum mechanics.", expertise: "Physics", organization: "Tech University", department: "Science", level: "University" },
            { userId: 5, introduction: "History teacher with a passion for European history.", expertise: "History", organization: "Historical Institute", department: "Humanities", level: "College" },
            { userId: 6, introduction: "Art teacher specializing in Renaissance art.", expertise: "Art History", organization: "Fine Arts Academy", department: "Arts", level: "University" },
            { userId: 7, introduction: "Expert in English literature and composition.", expertise: "English Literature", organization: "Liberal Arts College", department: "English", level: "University" },
            { userId: 8, introduction: "Teacher with a focus on chemical engineering principles.", expertise: "Chemical Engineering", organization: "Engineering School", department: "Engineering", level: "University" },
        ], {});
        console.log("Teachers seeded successfully.");
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("teacher");
        console.log("Teacher table dropped successfully.");
    },
};
