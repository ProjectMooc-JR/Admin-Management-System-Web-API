const courseService = require("../service/courseService");

const createCourse = async (req, res) => {
  try {
    const defaultTeacherId = 1;

    const courseData = {
      CourseName: req.body.CourseName,
      Description: req.body.Description,
      CategoryID: req.body.CategoryID,
      Cover: req.body.Cover,
      TeacherID: defaultTeacherId,
      PublishedAt: req.body.PublishedAt || new Date().toISOString(),
    };

    const newCourseId = await courseService.addCourseAsync(courseData);

    res.status(201).json({
      isSuccess: true,
      message: "Course created successfully",
      data: { courseId: newCourseId },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      isSuccess: false,
      message: error.message,
      data: {},
    });
  }
};

// Update course
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

    const updatedCourse = await courseService.updateCourseAsync(courseId, courseData);

    res.status(200).json({
      isSuccess: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: error.message,
      data: {},
    });
  }
};

// Delete course by ID
const deleteCourseById = async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const result = await courseService.deleteCourseAsync(courseId);

    res.status(result.isSuccess ? 200 : 500).json({
      isSuccess: result.isSuccess,
      message: result.isSuccess ? "Course deleted successfully" : result.message,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: error.message,
      data: {},
    });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const result = await courseService.getAsyncAllCourses();
    res.status(result.isSuccess ? 200 : 500).json({
      isSuccess: result.isSuccess,
      message: result.isSuccess ? "Courses fetched successfully" : "Failed to fetch courses",
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: error.message,
      data: [],
    });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await courseService.getCourseByIdAsync(courseId);

    if (!course) {
      return res.status(404).json({
        isSuccess: false,
        message: "Course not found",
        data: {},
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Course fetched successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: error.message,
      data: {},
    });
  }
};

// Get courses with pagination
const getAllCoursesByPage = async (req, res) => {
  const page = parseInt(req.params.page) || 1;
  const pageSize = parseInt(req.params.pageSize) || 10;

  try {
    const result = await courseService.getAllCoursesAsync(page, pageSize);

    res.status(result.isSuccess ? 200 : 500).json({
      isSuccess: result.isSuccess,
      message: result.isSuccess ? "Courses fetched successfully" : "Failed to fetch courses",
      data: {
        items: result.data.items,
        total: result.data.total,
      },
    });
  } catch (error) {
    console.error("Error occurred in getAllCoursesByPage:", error);
    res.status(500).json({
      isSuccess: false,
      message: "Error occurred while fetching courses' information",
      data: {},
    });
  }
};

module.exports = {
  createCourse,
  updateCourse,
  deleteCourseById,
  getAllCourses,
  getCourseById,
  getAllCoursesByPage,
};
