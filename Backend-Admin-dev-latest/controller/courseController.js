const courseService = require('../service/courseService');


const createCourse = async (req, res) => {
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
const updateCourse = async (req, res) => {
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


//Delete course by ID
const deleteCourseById = async (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const result = await courseService.deleteCourse(courseId);
    res.status(result.isSuccess ? 200 : 400).json({
        status: result.isSuccess ? 200 : 400,
        message: result.message,
    });
};


//Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get course by ID
const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await courseService.getCourseById(courseId);
        if (!course) {
    return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createCourse,
    updateCourse,
    deleteCourseById,
    getAllCourses,
    getCourseById,
};
