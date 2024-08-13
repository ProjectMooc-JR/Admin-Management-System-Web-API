const { db } = require("../db/mysqldb.js");

const getCourseSchedulesAsync = async () => {
  let sql = "SELECT * FROM courseschedule";
  let result = await db.query(sql);
  return result[0];
};

const getCourseScheduleByIdAsync = async (id) => {
  let sql = "SELECT * FROM courseschedule WHERE id = ?";
  let result = await db.query(sql, [id]);
  return result[0][0];
};

const addCourseScheduleAsync = async (courseScheduleData) => {
  const { courseId, startDate, endDate, isPublished } = courseScheduleData;
  let sql =
    "INSERT INTO courseschedule (CourseId startDate, endDate, isPublished) VALUES (?, ?, ?, ?)";
  let result = await db.query(sql, [courseId, startDate, endDate, isPublished]);
  return result[0].insertId;
};

module.exports = {
  getCourseSchedulesAsync,
  getCourseScheduleByIdAsync,
  addCourseScheduleAsync,
};
