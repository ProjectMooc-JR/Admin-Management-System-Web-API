const { db } = require("../db/mysqldb.js");
//add course category
const addCourseCategoryAsync = async (courseCategory) => {
  const { CategoryName, Level, ParentID, Notes } = courseCategory;
  const insertSql = "INSERT INTO coursecategories (CategoryName, Level, ParentID, Notes) VALUES (?, ?, ?, ?);";
  const querySql = "select * from coursecategories where CategoryName = ? ;";
  const values = [CategoryName, Level, ParentID, Notes];
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [result] = await db.query(querySql, [CategoryName]);
    if (result.length > 0) {
      return { isSuccess: false, msg: "course category already exits", data: null }
    }
    const [rows] = await db.query(insertSql, values);
    return { isSuccess: true, msg: "insert successfully", data: rows.insertId };
  } catch (error) {
    throw new Error(`Error adding course: ${error.message}`);
  }
};
// update course category
const updateCourseCategoryAsync = async (courseCategory) => {
  const { id, CategoryName, Level, ParentID, Notes } = courseCategory;

  const selectSql = "SELECT * FROM coursecategories WHERE ID = ?;";
  const updateSql = `UPDATE coursecategories 
                     SET CategoryName = ?, Level = ?, ParentID = ?, Notes = ?
                     WHERE ID = ?`;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();
    const [rows] = await db.query(selectSql, [id]);
    if (rows.length === 0) {
      await connection.rollback();
      return { isSuccess: false, msg: "course category not exist", data: null };
    }
    const values = [CategoryName, Level, ParentID, Notes, id];

    const [updateResult] = await db.query(updateSql, values);
    if (updateResult.affectedRows !== 1) {
      await connection.rollback();
      return { isSuccess: false, msg: "update failed", data: null };
    }
    const [updatedRows] = await db.query(selectSql, [id]);
    await connection.commit();
    return { isSuccess: true, msg: "update successfully", data: updatedRows };
  } catch (error) {
    await connection.rollback();
    return { isSuccess: false, msg: error.message, data: null };
  } finally {
    connection.release();
  }
};
//delete course category by id
const deleteCourseCategoryByIdAsync = async (courseCategoryId) => {
  const connection = await db.getConnection()
  const checkParentIdSql = "Select count(*) as count from coursecategories where ParentID=?";
  const checkCourse = "Select count(*) as count from courses where CategoryID=? ";
  const deleteSql = "Delete FROM coursecategories WHERE ID = ? ;";
  try {
    await connection.beginTransaction();
    const [result] = await connection.query(checkParentIdSql, [courseCategoryId])
    if (result[0].count !== 0) {
      throw new Error("This category is the parent class of other course categories, which cannot be deleted");
    }
    const [result1] = await connection.query(checkCourse, [courseCategoryId]);
    if (result1[0].count !== 0) {
      throw new Error("This category is the parent class of other course, which cannot be deleted");
    }
    const [rows] = await connection.query(deleteSql, [courseCategoryId]);
    if (rows.affectedRows === 0) {
      return { isSuccess: false, msg: "course category not exist", data: null }
    }
    await connection.commit();
    return { isSuccess: true, msg: "course category delete successfully", data: null };
  } catch (error) {
    await connection.rollback();
    throw new Error(`Error deleting course category: ${error.message}`);
  } finally {
    connection.release();
  }
};
// get all course category
const getAllCourseCategoryAsync = async (page, pageSize) => {
  const count = "SELECT count(*) total FROM coursecategories";
  let sql = "SELECT * FROM coursecategories limit ? offset ? ;";
  try {
    let resultCount = await db.query(count);
    let total = resultCount[0][0].total;
    if (total == 0) {
      return { isSuccess: true, message: "", data: { items: [], total: 0 } };
    }
    let resultData = await db.query(sql, [pageSize, (page - 1) * pageSize]);
    console.log(resultData)
    let courseCategoriesList = [];
    if (resultData[0].length > 0) {
      resultData[0].forEach((element) => {
        let courseCategory = { id: 0 };
        courseCategory.id = element.ID;
        courseCategory.categoryName = element.CategoryName;
        courseCategory.Level = element.Level;
        courseCategory.ParentID = element.ParentID;
        courseCategory.Notes = element.Notes;
        courseCategoriesList.push(courseCategory);
      });
    }
    return {
      isSuccess: true,
      message: "",
      data: { items: courseCategoriesList, total: total },
    };
  } catch (error) {
    throw new Error(`Error fetching course category: ${error.message}`);

  }

};
// get course category by id
const getCourseCategoryById = async (courseId) => {
  const sql = "SELECT * FROM coursecategories WHERE ID = ?";
  try {
    const [rows] = await db.query(sql, [courseId]);
    if (rows.length === 0) {
      return { isSuccess: false, msg: "course category not exist", data: null };
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
