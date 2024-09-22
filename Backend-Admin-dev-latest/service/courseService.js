const { db } = require("../db/mysqldb.js");

// Retrieve the TeacherID based on the UserID
const getTeacherIdByUserIdAsync = async (userId) => {
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
const addCourseAsync = async (course) => {
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
const updateCourseAsync = async (courseId, updatedCourse) => {
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

// Delete course by ID
const deleteCourseAsync = async (courseId) => {
  const connection = await db.getConnection(); // Get a connection from the pool
  try {
    // Start a new transaction
    await connection.beginTransaction();

    // Delete related chapters
    await connection.query("DELETE FROM coursechapters WHERE CourseID = ?", [
      courseId,
    ]);

    // Delete related comments
    await connection.query("DELETE FROM coursecomments WHERE CourseID = ?", [
      courseId,
    ]);

    // Delete the course
    const result = await connection.query("DELETE FROM Courses WHERE ID = ?", [
      courseId,
    ]);

    // If no course was found to delete, throw an error
    if (result.affectedRows === 0) {
      throw new Error("Course not found");
    }

    // Commit the transaction
    await connection.commit();

    return { isSuccess: true };
  } catch (error) {
    // Check if the error is due to foreign key constraints
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      // MySQL foreign key constraint error code
      await connection.rollback(); // Rollback the transaction
      return {
        isSuccess: false,
        message: "Cannot delete due to foreign key constraints",
      };
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
const getAsyncAllCourses = async () => {
  const query = "SELECT * FROM Courses";
  try {
    const [rows] = await db.query(query);
    return { isSuccess: true, message: "successful", data: rows };
  } catch (error) {
    throw new Error(`Error select comment: ${error.message}`);
  }
};

// Get courses with pagination
const getAllCoursesAsync = async (page, pageSize) => {
  // Define a SQL script to count the total number of courses in the database
  let countSql = "SELECT count(*) total FROM courses;";
  let [resultCount] = await db.query(countSql);

  // Extract the total number of courses from the query result
  let total = resultCount[0].total;

  // If the total number of courses is 0, return an empty list with a total of 0
  if (total === 0) {
    return { isSuccess: true, message: "", data: { items: [], total: 0 } };
  }

  // Define the SQL script to retrieve courses' data with pagination using LIMIT and OFFSET
  let sql;
  sql = `
      SELECT c.ID, c.CourseName, c.Description, g.CategoryName, c.Cover, c.TeacherID, c.PublishedAt,
             t.User_id, u.username 
      FROM courses AS c 
      INNER JOIN teachers AS t ON c.TeacherID = t.ID 
      INNER JOIN user AS u ON t.User_id = u.ID 
      INNER Join coursecategories g on g.ID=c.CategoryID
      LIMIT ? OFFSET ?;
    `;

  // Execute the pagination query and store the result in resultData
  try {
    const [rows] = await db.query(sql, [pageSize, (page - 1) * pageSize]);
    let courseList = [];

    // If search result is not empty, process each course and assign its values to an object
    let chapterItems;
    if (rows.length > 0) {
      let cidArray = [];
      rows.forEach((field) => {
        cidArray.push(field.ID);
        let course = {
          id: field.ID,
          CourseName: field.CourseName,
          Description: field.Description,
          CategoryName: field.CategoryName,
          Cover: field.Cover,
          TeacherID: field.TeacherID,
          PublishedAt: field.PublishedAt,
          username: field.username,
        };
        // Add the course object to the courseList array
        courseList.push(course);
      });

      let ids = cidArray.join(",");

      let sqlchapter = `select ChapterTitle, ChapterDescription, CourseID, VideoURL,ChapterOrder  from coursechapters where CourseID in(${ids})`;
      const [chaptersrows] = await db.query(sqlchapter);
      chapterItems = chaptersrows;
    }

    if (chapterItems && chapterItems.length > 0) {
      courseList.forEach((x) => {
        let coursetChapterItems = chapterItems.filter(
          (y) => y.CourseID == x.id
        );
        x.chapterItems = coursetChapterItems.sort(
          (a, b) => a.ChapterOrder - b.ChapterOrder
        );
      });
    }
    // Return the result object containing the list of courses and the total count
    return {
      isSuccess: true,
      message: "successful",
      data: { items: courseList, total: total },
    };
  } catch (error) {
    throw new Error(`Error fetching courses with pagination: ${error.message}`);
  }
};

// Get course by ID
const getCourseByIdAsync = async (courseId) => {
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
  addCourseAsync,
  getTeacherIdByUserIdAsync,
  updateCourseAsync,
  deleteCourseAsync,
  getAsyncAllCourses,
  getCourseByIdAsync,
  getAllCoursesAsync, // 带分页功能的课程查询方法
};
