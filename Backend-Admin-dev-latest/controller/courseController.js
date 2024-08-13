const courseService = require('../service/courseService');
// const teacherService = require('../service/teacherService');

// // Create a new course
// exports.createCourse = async (req, res) => {
//     try {
//         const userId = req.user.id; // Get the user ID from the JWT token
//         console.log("User ID:", userId);
//         // Version 1: Directly use courseService to get TeacherID
//         const teacherId = await courseService.getTeacherIdByUserId(userId);
//         console.log("Teacher ID:", teacherId);
//         /* 
//         Version 2: Use teacherService to get TeacherID (commented out)
//         const teacherId = await teacherService.getTeacherIdByUserId(userId);
//         */

//         if (!teacherId) {
//             return res.status(404).json({ message: 'Teacher not found for the given user ID' });
//         }

//         const courseData = {
//             CourseName: req.body.CourseName, 
//             Description: req.body.Description,
//             CategoryID: req.body.CategoryID,
//             Cover: req.body.Cover,  
//             TeacherID: teacherId,  // Use the TeacherID retrieved from the appropriate service
//             PublishedAt: req.body.PublishedAt, // Optionally set 'PublishedAt', otherwise will use current date
//         };

//         const newCourseId = await courseService.addCourse(courseData); // Call the course service layer method
//         res.status(201).json({ courseId: newCourseId });
//     } catch (error) {
//         console.error(error); 
//         res.status(500).json({ message: error.message });
//     }
// };   

exports.createCourse = async (req, res) => {
    try {
        // Set a default TeacherID, for example, 1 or another existing teacher ID
        const defaultTeacherId = 1; 

        const courseData = {
            CourseName: req.body.CourseName,
            Description: req.body.Description,
            CategoryID: req.body.CategoryID,
            Cover: req.body.Cover,
            TeacherID: defaultTeacherId, // Use the default TeacherID
            PublishedAt: req.body.PublishedAt || new Date().toISOString() // Use current date and time as the publish time
        };

        // Use the addCourse method from courseService to add the data
        const newCourseId = await courseService.addCourse(courseData);
        
        // Return the newly created course ID
        res.status(201).json({ courseId: newCourseId });
    } catch (error) {
        // Print out the error for debugging purposes
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

//update course
exports.updateCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        
        const courseData = {
            CourseName: req.body.CourseName,
            Description: req.body.Description,
            CategoryID: req.body.CategoryID,
            Cover: req.body.Cover,
            TeacherID: req.body.TeacherID, 
            PublishedAt: req.body.PublishedAt, 
        };
        

        const updatedCourse = await courseService.updateCourse(courseId, courseData);

        res.status(200).json({ course: updatedCourse });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Delete course
exports.deleteCourse = async (req, res) => {
    const courseId = req.params.courseId;

    try {
        await courseService.deleteCourse(courseId);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get course by ID
exports.getCourseById = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await courseService.getCourseById(courseId);
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

