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
  const { CourseName, Description, CategoryID, Cover, TeacherID, PublishedAt } =
    updatedCourse;
  const query = `
        UPDATE Courses 
        SET CourseName = ?, Description = ?, CategoryID = ?, Cover = ?, TeacherID = ?, PublishedAt = ? 
        WHERE ID = ?
    `;
  const values = [
    CourseName,
    Description,
    CategoryID,
    Cover,
    TeacherID,
    PublishedAt,
    courseId,
  ];

  try {
    const [result] = await db.query(query, values);
    return result;
  } catch (error) {
    throw new Error(`Error updating course: ${error.message}`);
  }
};

//Delete course
/**
 * @param {number} courseId - The ID of the course to delete
 * @returns {Promise<void>}
 */

const deleteChapter = async (courseId) => {
  const query = "DELETE FROM coursechapters WHERE CourseID = ?";
  const [result] = await db.query(query, [courseId]);
  return result.affectedRows > 0;
};

const deleteComments = async (courseId) => {
  const query = "DELETE FROM coursecomments WHERE CourseID = ?";
  const [result] = await db.query(query, [courseId]);
  return result.affectedRows > 0;
};

const deleteCourse = async (courseId) => {
  if (deleteChapter(courseId) && deleteComments(courseId)) {
    const query = "DELETE FROM Courses WHERE ID = ?";

    try {
      const [result] = await db.query(query, [courseId]);
      if (result.affectedRows === 0) {
        throw new Error("Course not found");
      }
      return result;
    } catch (error) {
      throw new Error(`Error deleting course: ${error.message}`);
    }
  }else{
    throw new Error(`Error deleting course: ${error.message}`);
  }
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
  const query = "SELECT * FROM Courses WHERE ID = ?";
  try {
    const [rows] = await db.query(query, [courseId]);
    if (rows.length === 0) {
      throw new Error("Course not found");
    }
    return rows[0];
  } catch (error) {
    throw new Error(`Error fetching course: ${error.message}`);
  }
};

module.exports = {
  addCourse,
  getTeacherIdByUserId,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
};
