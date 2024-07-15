const teacher = require("../model/teacher");

const teachers= [
    { userId: 3, introduction: "Experienced mathematics teacher with a decade of tutoring.", expertise: "Mathematics", organization: "City College", department: "Math", level: "University" },
    { userId: 4, introduction: "Dedicated physics teacher, specializing in quantum mechanics.", expertise: "Physics", organization: "Tech University", department: "Science", level: "University" },
    { userId: 5, introduction: "History teacher with a passion for European history.", expertise: "History", organization: "Historical Institute", department: "Humanities", level: "College" },
    { userId: 6, introduction: "Art teacher specializing in Renaissance art.", expertise: "Art History", organization: "Fine Arts Academy", department: "Arts", level: "University" },
    { userId: 7, introduction: "Expert in English literature and composition.", expertise: "English Literature", organization: "Liberal Arts College", department: "English", level: "University" },
    { userId: 8, introduction: "Teacher with a focus on chemical engineering principles.", expertise: "Chemical Engineering", organization: "Engineering School", department: "Engineering", level: "University" },
];

const insertTeachers = async () => {
    try {
        await teacher.sync();
        const result = await teacher.bulkCreate(teachers);
        console.log("Teacher Created Successfully", result);
    }
    catch (error) {
        console.log("Failed to create teachers", error);
    }
}

//insertTeachers();

module.exports = insertTeachers;