const { db } = require("../db/mysqldb.js");

const addCourseCategoryAsync = async (courseCategory) => {
  const { CategoryName, Level, ParentID, Notes } = courseCategory;
  const insertSql = "INSERT INTO coursecategories (CategoryName, Level, ParentID, Notes) VALUES (?, ?, ?, ?);";
  const querySql="select * from coursecategories where CategoryName = ? ;";
  const values = [CategoryName, Level, ParentID, Notes];
  try {
    const [result]=await db.query(querySql,[CategoryName]);
    if(result.length>0){
      return { isSuccess: false, msg: "course category already exits", data: null }
    }
    const [rows] = await db.query(insertSql, values);
    return { isSuccess: true, msg: "insert successfully", data: rows.insertId };
  } catch (error) {
    throw new Error(`Error adding course: ${error.message}`);
  }
};

const updateCourseCategoryAsync = async (courseCategory) => {
  const { id, CategoryName, Level, ParentID, Notes } = courseCategory;
  const updateSql = "UPDATE coursecategories SET CategoryName = ?, Level = ?, ParentID = ?, Notes = ? WHERE ID = ?;";
  const selectSql = "SELECT * FROM coursecategories WHERE ID = ?;"; const values = [CategoryName, Level, ParentID, Notes, id];
  try {
    const [updateResult] = await db.query(updateSql, values);
    console.log(updateResult)
    if (updateResult.affectedRows !== 1) {
      return { isSuccess: false, msg: "update faild", data: null };
    }
    const [rows] = await db.query(selectSql, [id]);
    return { isSuccess: true, msg: "update successfully", data: rows };
  } catch (error) {
    return { isSuccess: false, msg: error.message, data: null }
  }
};

const deleteCourseCategoryByIdAsync = async (courseId) => {
  const sql = "DELETE FROM coursecategories WHERE ID = ? ;";
  try {
    const [rows] = await db.query(sql, [courseId]);
    if (rows.affectedRows === 0) {
      return { isSuccess: false, msg: "course category not found", data: null }
    }
    return { isSuccess: true, msg: "course category delete successfully", data: null };
  } catch (error) {
    throw new Error(`Error deleting course: ${error.message}`);
  }
};

const getAllCourseCategoryAsync = async () => {
  const sql = "SELECT  * FROM coursecategories";
  try {
    const [result] = await db.query(sql);
    return { isSuccess: true, msg: "query successfully", data: result };
  } catch (error) {
    throw new Error(`Error fetching courses: ${error.message}`);
  }
};

const getCourseCategoryById = async (courseId) => {
  const sql = "SELECT * FROM coursecategories WHERE ID = ?";
  try {
    const [rows] = await db.query(sql, [courseId]);
    if (rows.length === 0) {
      return { isSuccess: false, msg: "course category not exits", data: null };
    }
    return { isSuccess: true, msg: "course category delete successfully", data: rows };
    ;
  } catch (error) {
    throw new Error(`Error fetching course category: ${error.message}`);
  }
};
module.exports = {
  getCourseCategoryById,
  getAllCourseCategoryAsync,
  deleteCourseCategoryByIdAsync,
  addCourseCategoryAsync,
  updateCourseCategoryAsync
}