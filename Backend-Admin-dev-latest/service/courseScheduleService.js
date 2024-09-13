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
  const { id, startDate,endDate, CourseId, isPublished } = courseScheduleData;
  let checkcourse="select count(*) from courseschedule where CourseId=? and (startDate<=? or endDate>=?) and (startDate<=? or endDate>=?)";
  let checkcourse1="select count(*) from courseschedule where id<>? and  CourseId=? and (startDate<=? or endDate>=?) and (startDate<=? or endDate>=?)";
  let sql =
    "INSERT INTO courseschedule (startDate, endDate, CourseId, isPublished) VALUES (?, ?, ?, ?,?)";
  let result = await db.query(sql, [id, startDate, endDate, isPublished]);
  return result[0].insertId;
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
