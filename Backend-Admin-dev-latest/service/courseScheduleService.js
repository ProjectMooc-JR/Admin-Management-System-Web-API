const { db } = require("../db/mysqldb.js");

// const getCourseSchedules = async () => {
//   let sql = "SELECT * FROM courseschedule";
//   let result = await db.query(sql);
//   return result[0];
// };

const getCourseSchedulesAsync = async (page, pageSize) => {
  // define a SQL script to count the total number of courseschedule in database
  let countSql = "SELECT count(*) total FROM courseschedule;";
  let [resultCount] = await db.query(countSql);
  // extract the total number of courseschedule from the query result
  let total = resultCount[0].total;
  // if the total number of teachers is 0, return an empty list with a total of 0
  if (total == 0) {
    return { isSuccess: true, message: "", data: { items: [], total: 0 } };
  }
  // Define the SQL script to receive teachers' data with pagination using LIMIT and OFFSET ← they are SQL script rules
  let sql = "SELECT * FROM courseschedule LIMIT ? OFFSET ?;";
  // execute the pagination query and store the result in resultData
  // eg: p1:id=1 ~ id=10
  let resultData = await db.query(sql, [pageSize, (page - 1) * pageSize]);
  let coursescheduleList = [];
  // if search result (object) of courseSchedule is not null, forEach them and assign values from database to the properties of object
  if (resultData[0].length > 0) {
    console.log("resultData[0].length > 0 resultData[0].length > 0");
    console.log("resultData[0]", resultData[0]);

    resultData[0].forEach((field) => {
      let courseschedules = { id: 0 };

      courseschedules.id = field.ID;
      courseschedules.StartDate = field.StartDate;
      courseschedules.EndDate = field.EndDate;
      courseschedules.CourseID = field.CourseID;
      courseschedules.IsPublished = field.IsPublished;

      // push teacher object which is filled by query information to the previous empty teacher array
      coursescheduleList.push(courseschedules);
    });
  }
  // Return the result object containing the list of teachers and the total count, along with a success flag
  return {
    isSuccess: true,
    message: "",
    data: { items: coursescheduleList, total: total },
  };
};

const getCourseScheduleByIdAsync = async (id) => {
  let sql = "SELECT * FROM courseschedule WHERE id = ?";
  let result = await db.query(sql, [id]);
  return result[0][0];
};

const addCourseScheduleAsync = async (courseScheduleData) => {
  const { id, startDate,endDate, CourseId, isPublished } = courseScheduleData;
  let checkcourse="select count(*) from courseschedule where CourseId=? and (startDate<=? or endDate>=?) and (startDate<=? or endDate>=?)";
  let checkcourse1="select count(*) from courseschedule where id<>? and  CourseId=? and (startDate<=? or endDate>=?) and (startDate<=? or endDate>=?)";
  let sql =
    "INSERT INTO courseschedule (startDate, endDate, CourseId, isPublished) VALUES (?, ?, ?, ?,?)";
  let result = await db.query(sql, [id, startDate, endDate, isPublished]);
  return result[0].insertId;
};

const deleteCourseScheduleAsync = async (id) => {
  let sql = "DELETE FROM courseschedule WHERE id = ?";
  let result = await db.query(sql, [id]);
  return result[0].affectedRows; // 返回受影响的行数
};

const updateCourseScheduleAsync = async (id, courseScheduleData) => {
  const { startDate, endDate, isPublished } = courseScheduleData;
  let sql =
    "UPDATE courseschedule SET startDate = ?, endDate = ?, isPublished = ? WHERE id = ?";
  let result = await db.query(sql, [startDate, endDate, isPublished, id]);
  return result[0].affectedRows; // 返回受影响的行数
};

module.exports = {
  getCourseSchedulesAsync,
  getCourseScheduleByIdAsync,
  addCourseScheduleAsync,
  deleteCourseScheduleAsync,
  updateCourseScheduleAsync,
};
