const { db } = require("../db/mysqldb.js");

// Fetch all teachers' information from database and slipt into pages
const getAllTeachersAsync = async (page, pageSize, includeUserData = false) => {
  // define a SQL script to count the total number of teachers in database
  let countSql = "SELECT count(*) total FROM teachers;";
  let [resultCount] = await db.query(countSql);
  // extract the total number of teachers from the query result
  let total = resultCount[0].total;
  // if the total number of teachers is 0, return an empty list with a total of 0
  if (total == 0) {
    return { isSuccess: true, message: "", data: { items: [], total: 0 } };
  }
  // Define the SQL script to receive teachers' data with pagination using LIMIT and OFFSET ← they are SQL script rules
  let sql;
  if (includeUserData) {
    sql = `
      SELECT t.ID, t.User_id, t.Specialization, t.Description, t.HireDate, t.HireStatus, t.MobileNum, t.LinkedInLink,
             u.username
      FROM teachers t
      INNER JOIN user u ON t.User_id = u.id
      LIMIT ? OFFSET ?;`;
  } else {
    sql = "SELECT * FROM teachers LIMIT ? OFFSET ?;";
  }
  // execute the pagination query and store the result in resultData
  // eg: p1:id=1 ~ id=10
  let resultData = await db.query(sql, [pageSize, (page - 1) * pageSize]);
  let teacherList = [];
  // if search result (object) of teachers is not null, forEach them and assign values from database to the properties of object
  if (resultData[0].length > 0) {
    console.log("resultData[0].length > 0 resultData[0].length > 0");
    console.log("resultData[0]", resultData[0]);

    resultData[0].forEach((field) => {
      let teacher = {
        id: field.ID,
        User_id: field.User_id,
        Specialization: field.Specialization,
        Description: field.Description,
        HireDate: field.HireDate,
        HireStatus: field.HireStatus,
        MobileNum: field.MobileNum,
        LinkedInLink: field.LinkedInLink,
        username: includeUserData ? field.username : undefined,
      };

      // push teacher object which is filled by query information to the previous empty teacher array
      teacherList.push(teacher);
    });
  }
  // Return the result object containing the list of teachers and the total count, along with a success flag
  return {
    isSuccess: true,
    message: "",
    data: { items: teacherList, total: total },
  };
};

// Get teachers' information by ID
const getTeacherByIdAsync = async (id) => {
  // 定义用ID拿取teacher数据的sql语句
  let sql = "select * from teachers where id = ?";
  let result = await db.query(sql, [id]);
  // 检查查询结果的第一条记录是否存在: length > 0就是说明有值 = 存在
  if (result[0].length > 0) {
    return { isSuccess: true, message: "", data: result[0][0] };
  }
  // 如果查询的第一条记录≤0，说明查询结果为空：
  return { isSuccess: false, message: "teacher is not found", data: {} };
};

// 添加教师
const addTeacherAsync = async (teacher) => {
  let sql =
    "insert into teachers (User_id, Specialization, Description, HireDate, HireStatus, MobileNum, LinkedInLink) values (?, ?, ?, ?, ?, ?, ?)";
  let [result] = await db.query(sql, [
    teacher.User_id,
    teacher.Specialization,
    teacher.Description,
    teacher.HireDate,
    teacher.HireStatus ? 1 : 0,
    teacher.MobileNum,
    teacher.LinkedInLink,
  ]);

  console.log("DB query result:", result);

  if (result.affectedRows > 0) {
    return { isSuccess: true, message: "Teacher added successfully" };
  } else {
    return { isSuccess: false, message: "Failed to add teacher" };
  }
};

// 更新教师
const updateTeacherAsync = async (teacher) => {
  let sql =
    "update teachers SET Specialization=?, Description=?, HireDate=?, HireStatus=?, MobileNum=?, LinkedInLink=? where id=?";
  let [result] = await db.query(sql, [
    //teacher.User_id,
    teacher.Specialization,
    teacher.Description,
    teacher.HireDate,
    teacher.HireStatus,
    teacher.MobileNum,
    teacher.LinkedInLink,
    teacher.id, // NOTE: id should be placed always in the last
  ]);
  console.log("updateTeacherAsync result", result);
  if (result.affectedRows > 0) {
    return { isSuccess: true, message: "Teacher updated successfully" };
  }
  return { isSuccess: false, message: "Failed to update teacher" };
};

// 删除教师
const deleteTeacherByIdAsync = async (id) => {
  let sql = "delete from teachers where id=?";
  let [result] = await db.query(sql, [id]);
  if (result.affectedRows > 0) {
    return { isSuccess: true, message: "Teacher deleted successfully" };
  }
  return { isSuccess: false, message: "Failed to delete teacher" };
};

// Search a specific teacher by mobile number
const getTeacherByMobileNumAsync = async (MobileNum) => {
  let sql = "SELECT * FROM teachers WHERE MobileNum = ?";
  let result = await db.query(sql, [MobileNum]);

  if (result[0].length > 0) {
    return { isSuccess: true, message: "", data: result[0][0] };
  }
  return { isSuccess: false, message: "Teacher not found", data: {} };
};

module.exports = {
  getAllTeachersAsync,
  getTeacherByIdAsync,
  addTeacherAsync,
  updateTeacherAsync,
  deleteTeacherByIdAsync,
  getTeacherByMobileNumAsync,
};
