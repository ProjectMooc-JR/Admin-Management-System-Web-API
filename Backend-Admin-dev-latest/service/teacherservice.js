const { db } = require("../db/mysqldb.js");

// 从服务器中获取所有教师
const getAllTeachersAsync = async () => {
  // 定义拿取所有teacher数据的sql语句
  let sql = "select * from teachers";
  let result = await db.query(sql);
  return { isSuccess: true, message: "", data: result[0] };
};

// 根据教师ID获取教师
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
    "insert into teachers (User_id, Specialization, Description, HireDate, HireStatus) values (?, ?, ?, ?, ?)";
  let [result] = await db.query(sql, [
    teacher.User_id,
    teacher.Specialization,
    teacher.Description,
    teacher.HireDate,
    teacher.HireStatus ? 1 : 0,
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
    "update teachers SET Specialization=?, Description=?, HireDate=?, HireStatus=? where id=?";
  let result = await db.query(sql, [
    teacher.Specialization,
    teacher.Description,
    teacher.HireDate,
    teacher.HireStatus ? 1 : 0,
    teacher.id,
  ]);
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

module.exports = {
  getAllTeachersAsync,
  getTeacherByIdAsync,
  addTeacherAsync,
  updateTeacherAsync,
  deleteTeacherByIdAsync,
};
