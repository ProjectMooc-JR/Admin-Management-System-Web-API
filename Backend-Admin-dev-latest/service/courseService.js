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

//Delete course by ID
const deleteCourse = async (courseId) => {
    const connection = await db.getConnection(); // Get a connection from the pool
    try {
        // Start a new transaction
        await connection.beginTransaction();

        // Delete related chapters
        await connection.query('DELETE FROM coursechapters WHERE CourseID = ?', [courseId]);

        // Delete related comments
        await connection.query('DELETE FROM coursecomments WHERE CourseID = ?', [courseId]);

        // Delete the course
        const result = await connection.query('DELETE FROM Courses WHERE ID = ?', [courseId]);

        // If no course was found to delete, throw an error
        if (result.affectedRows === 0) {
            throw new Error('Course not found');
        }

        // Commit the transaction
        await connection.commit();

        return { isSuccess: true };
    } catch (error) {
        // Check if the error is due to foreign key constraints
        if (error.code === 'ER_ROW_IS_REFERENCED_2') { // MySQL foreign key constraint error code
            await connection.rollback(); // Rollback the transaction
            return { isSuccess: false, message: 'Cannot delete due to foreign key constraints' };
        } else {
            // For any other errors, rollback the transaction
            await connection.rollback();
            return { isSuccess: false, message: error.message };
        }
    } finally {
        // Release the connection back to the pool
        connection.release();
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
