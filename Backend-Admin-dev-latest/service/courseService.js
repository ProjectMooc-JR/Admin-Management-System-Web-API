const { db } = require("../db/mysqldb.js");

// Retrieve the TeacherID based on the UserID
const getTeacherIdByUserId = async (userId) => {
  console.log("Inside getTeacherIdByUserId, User ID:", userId);
  try {
    const [teacherResult] = await db.query(
      "SELECT ID FROM teachers WHERE User_id = ?",
      [userId]
    );
    if (teacherResult.length === 0) {
      return null;
    }
    return teacherResult[0].ID; // Return the TeacherID
  } catch (error) {
    throw new Error(`Error fetching teacher ID: ${error.message}`);
  }
};

// Use async/await to add a new course
const addCourse = async (course) => {
  const { CourseName, Description, CategoryID, Cover, TeacherID, PublishedAt } =
    course;

  // SQL query to insert a new course
  const query = `
    INSERT INTO Courses (CourseName, Description, CategoryID, Cover, TeacherID, PublishedAt)
    VALUES (?, ?, ?, ?, ?, ?);
`;

  // Values to be inserted
  const values = [
    CourseName,
    Description,
    CategoryID,
    Cover,
    TeacherID,
    PublishedAt || new Date(),
  ];

  try {
    // Execute the query
    const [result] = await db.query(query, values);
    // Return the ID of the newly created course
    return result.insertId;
  } catch (error) {
    throw new Error(`Error adding course: ${error.message}`); // Catch and throw errors
  }
};

// Update a course based on the course ID and the updated course data
const updateCourse = async (courseId, updatedCourse) => {
  const { CourseName, Description, CategoryID, Cover, TeacherID, PublishedAt } = updatedCourse;
  const query = `
    UPDATE Courses 
    SET CourseName = ?, Description = ?, CategoryID = ?, Cover = ?, TeacherID = ?, PublishedAt = ? 
    WHERE ID = ?`;

  const values = [CourseName, Description, CategoryID, Cover, TeacherID, PublishedAt, courseId];

  try {
    const [result] = await db.query(query, values);
    return result;
  } catch (error) {
    throw new Error(`Error updating course: ${error.message}`);
  }
};

//Delete course by ID
const deleteCourseByIdAsync = async (courseId) => {
    const sql = "DELETE FROM Courses WHERE ID=?";
    const result = await db.query(sql, [courseId]);
    if (result.affectedRows > 0) {
        return { isSuccess: true, message: "Course deleted successfully" };
    }
    return { isSuccess: false, message: "Failed to delete course" };
};

// Get all courses
const getAllCourses = async () => {
  const query = "SELECT * FROM Courses";
  try {
    const [rows] = await db.query(query);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching courses: ${error.message}`);
  }
};

//Get course by ID
const getCourseById = async (courseId) => {
    const query = "SELECT * FROM courses WHERE ID = ?";
    try {
        const rows = await db.query(query, [courseId]);
        
        if (rows.length > 0) {
            return { isSuccess: true, data: rows[0], message: "" };
        } else {
            return { isSuccess: false, message: "Course not found", data: {} };
        }
    } catch (error) {
        throw new Error(`Error fetching course: ${error.message}`);
    }
};

module.exports = {
  addCourse,
  getTeacherIdByUserId,
  updateCourse,
  deleteCourseByIdAsync,
  getAllCourses,
  getCourseById,
};
