const { db } = require("../db/mysqldb.js");

const getCourseSchedules = async () => {
  let sql = "SELECT * FROM courseschedule";
  let result = await db.query(sql);
  return result[0];
};

const getCourseScheduleById = async (id) => {
  let sql = "SELECT * FROM courseschedule WHERE id = ?";
  let result = await db.query(sql, [id]);
  return result[0][0];
};

const addCourseSchedule = async (courseScheduleData) => {
  try {
    console.log(courseScheduleData);
    let { courseId, startDate, endDate, isPublished } = courseScheduleData;
    const formattedStartDate = new Date(startDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formattedEndDate = new Date(endDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    isPublished = isPublished ? true : false;

    let sql =
      "INSERT INTO courseschedule (CourseID, StartDate, EndDate, IsPublished) VALUES (?, ?, ?, ?)";
    let result = await db.query(sql, [
      courseId,
      formattedStartDate,
      formattedEndDate,
      isPublished,
    ]);
    return result[0].insertId;
  } catch (e) {
    console.log(e);
  }
};

const deleteCourseSchedule = async (id) => {
  let sql = "DELETE FROM courseschedule WHERE id = ?";
  let result = await db.query(sql, [id]);
  return result[0].affectedRows; // 返回受影响的行数
};

const updateCourseSchedule = async (id, courseScheduleData) => {
  const { startDate, endDate, isPublished } = courseScheduleData;
  let sql =
    "UPDATE courseschedule SET startDate = ?, endDate = ?, isPublished = ? WHERE id = ?";
  let result = await db.query(sql, [startDate, endDate, isPublished, id]);
  return result[0].affectedRows; // 返回受影响的行数
};

module.exports = {
  getCourseSchedules,
  getCourseScheduleById,
  addCourseSchedule,
  deleteCourseSchedule,
  updateCourseSchedule,
};
