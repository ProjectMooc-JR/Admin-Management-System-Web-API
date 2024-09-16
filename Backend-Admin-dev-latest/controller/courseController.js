const courseService = require("../service/courseService");
const fs = require("fs");

const logger =require("../common/logsetting")

const createCourse = async (req, res) => {
  try {
    const defaultTeacherId = 1;

    let avatarLocation = null;

    if (req.body.Cover) {
      // If an course is uploaded, save the course to the local directory public/images/course
      // 移除MIME类型前缀
      let base64Data = req.body.Cover.replace(/^data:image\/\w+;base64,/, "");
      //const buffer = Buffer.from(base64Data, "binary");
      const fileName = `course-${req.body.CourseName}.jpg`; // Use the CourseName as the filename
      const filePath = `public/images/course/${fileName}`; // File save path
      // Write the image to the file system
      fs.writeFileSync(
        filePath,
        base64Data,
        { encoding: "base64" },
        (err) => {
          logger.error('writeFileSync',err)
        }
      );
      avatarLocation = filePath;
    }

    const courseData = {
      CourseName: req.body.CourseName,
      Description: req.body.Description,
      CategoryID: req.body.CategoryID,
      Cover: avatarLocation,
      TeacherID: defaultTeacherId, // Use the default TeacherID
      PublishedAt: req.body.PublishedAt || new Date().toISOString(), // Use current date and time as the publish time
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
      const result = await courseService.getAllCoursesByPage();
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
