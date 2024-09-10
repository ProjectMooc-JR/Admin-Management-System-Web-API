const { db } = require("../db/mysqldb.js");
const logger = require("../common/logsetting.js");
//add course category
const addCourseCategoryAsync = async (courseCategory) => {
  const { CategoryName, Level, ParentID, Notes } = courseCategory;
  const insertSql =
    "INSERT INTO coursecategories (CategoryName, Level, ParentID, Notes,Version) VALUES (?, ?, ?, ?,?);";
  const querySql = "select * from coursecategories where CategoryName = ? ;";
  const values = [CategoryName, Level, ParentID, Notes, 0];
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [result] = await db.query(querySql, [CategoryName]);
    if (result.length > 0) {
      logger.warn(`Category ${CategoryName} already exists`);
      return {
        isSuccess: false,
        msg: "course category already exits",
        data: null,
      };
    }
    const [rows] = await db.query(insertSql, values);
    await connection.commit();

    return { isSuccess: true, msg: "insert successfully", data: rows.insertId };
  } catch (error) {
    await connection.rollback();
    logger.error(
      `Error adding course category ${CategoryName}: ${error.message}`
    );
    throw new Error(`Error adding course: ${error.message}`);
  } finally {
    connection.release();
    logger.info(`Transaction complete for category: ${CategoryName}`);
  }
};
// update course category
const updateCourseCategoryAsync = async (courseCategory) => {
  const { id, CategoryName, Level, ParentID, Notes } = courseCategory;

  const selectSql = "SELECT * FROM coursecategories WHERE ID = ?;";
  const updateSql = `UPDATE coursecategories 
                     SET CategoryName = ?, Level = ?, ParentID = ?, Notes = ?, Version = Version + 1 
                     WHERE ID = ? AND Version = ?;`;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();
    logger.info(`Starting transaction to update category with ID: ${id}`);
    const [rows] = await db.query(selectSql, [id]);
    if (rows.length === 0) {
      logger.warn(`Category with ID: ${id} does not exist.`);
      await connection.rollback();
      return { isSuccess: false, msg: "course category not exist", data: null };
    }
    console.log(rows);
    const currentVersion = rows[0].Version;
    console.log("currentVersion::;", currentVersion);
    const values = [CategoryName, Level, ParentID, Notes, id, currentVersion];

    const [updateResult] = await db.query(updateSql, values);
    console.log(updateResult);
    if (updateResult.affectedRows !== 1) {
      logger.warn(
        `Update failed for category with ID: ${id} due to version conflict.`
      );
      await connection.rollback();
      return {
        isSuccess: false,
        msg: "update failed due to version conflict",
        data: null,
      };
    }
    const [updatedRows] = await db.query(selectSql, [id]);
    await connection.commit();
    logger.info(`Category with ID: ${id} updated successfully.`);
    return { isSuccess: true, msg: "update successfully", data: updatedRows };
  } catch (error) {
    logger.error(`Error updating category with ID: ${id} - ${error.message}`);
    await connection.rollback();
    return { isSuccess: false, msg: error.message, data: null };
  } finally {
    logger.info(`Transaction complete for category with ID: ${id}`);
    connection.release();
  }
};
//delete course category by id
const deleteCourseCategoryByIdAsync = async (courseCategoryId) => {
  const connection = await db.getConnection();
  const checkParentIdSql =
    "Select count(*) as count from coursecategories where ParentID=?";
  const checkCourse =
    "Select count(*) as count from courses where CategoryID=? ";
  const deleteSql = "Delete FROM coursecategories WHERE ID = ? ;";
  try {
    await connection.beginTransaction();
    logger.info(
      `Starting transaction to delete category with ID: ${courseCategoryId}`
    );

    const [result] = await connection.query(checkParentIdSql, [
      courseCategoryId,
    ]);
    if (result[0].count !== 0) {
      logger.warn(
        `Category with ID: ${courseCategoryId} has child categories, deletion not allowed.`
      );

      throw new Error(
        "This category is the parent class of other course categories, which cannot be deleted"
      );
    }
    const [result1] = await connection.query(checkCourse, [courseCategoryId]);
    if (result1[0].count !== 0) {
      logger.warn(
        `Category with ID: ${courseCategoryId} has associated courses, deletion not allowed.`
      );

      throw new Error(
        "This category is the parent class of other course, which cannot be deleted"
      );
    }
    const [rows] = await connection.query(deleteSql, [courseCategoryId]);
    if (rows.affectedRows === 0) {
      logger.warn(`Category with ID: ${courseCategoryId} does not exist.`);

      return { isSuccess: false, msg: "course category not exist", data: null };
    }
    await connection.commit();
    logger.info(`Category with ID: ${courseCategoryId} deleted successfully.`);

    return {
      isSuccess: true,
      msg: "course category delete successfully",
      data: null,
    };
  } catch (error) {
    await connection.rollback();
    logger.error(
      `Error deleting category with ID: ${courseCategoryId} - ${error.message}`
    );

    throw new Error(`Error deleting course category: ${error.message}`);
  } finally {
    connection.release();
    logger.info(
      `Transaction complete for deleting category with ID: ${courseCategoryId}`
    );
  }
};
// get all course category
const getAllCourseCategoryAsync = async (page, pageSize) => {
  const count = "SELECT count(*) total FROM coursecategories";
  let sql = "SELECT * FROM coursecategories limit ? offset ? ;";
  try {
    logger.info("Starting query to fetch all course categories");

    const [result] = await db.query(sql);
    logger.info("Query successful: fetched all course categories");

    return { isSuccess: true, msg: "query successfully", data: result };
  } catch (error) {
    logger.error(`Error fetching course categories: ${error.message}`);
    throw new Error(`Error fetching courses: ${error.message}`);
  }
};

// get all course category
const getAllCourseCategoryLevelAsync = async (level) => {
  let wheresql = "";
  if (level > -1) {
    wheresql = " where Level = ?";
  }
  const sql = "SELECT * FROM coursecategories " + wheresql;
  try {
    logger.info("Starting query to fetch all course categories");
    const [result] = await db.query(sql, [level]);
    logger.info(
      "Query successful: fetched all course categories based on a level"
    );
    return { isSuccess: true, msg: "query successfully", data: result };
  } catch (error) {
    throw new Error(`Error fetching courses: ${error.message}`);
  }

};

// get course category by id
const getCourseCategoryById = async (courseId) => {
  const sql = "SELECT * FROM coursecategories WHERE ID = ?";
  try {
    logger.info(`Starting query to fetch course category with ID: ${courseId}`);

    const [rows] = await db.query(sql, [courseId]);
    if (rows.length === 0) {
      logger.warn(`Course category with ID: ${courseId} does not exist.`);
      return { isSuccess: false, msg: "course category not exist", data: null };
    }
    logger.info(`Successfully fetched course category with ID: ${courseId}`);
    return {
      isSuccess: true,
      msg: "course category delete successfully",
      data: rows,
    };
  } catch (error) {
    logger.error(
      `Error fetching course category with ID: ${courseId} - ${error.message}`
    );

    throw new Error(`Error fetching course category: ${error.message}`);
  }
};
const getAllCourseCategoryByPage = async (page, pageSize) => {
  let countSql = "SELECT count(*) total FROM coursecategories; ";
  let resultCount = await db.query(countSql);
  let total = resultCount[0][0].total;
  if (total == 0) {
    return { isSuccess: true, message: "", data: { items: [], total: 0 } };
  }
  let sql = "SELECT * FROM coursecategories limit ? offset ? ;";
  let resultData = await db.query(sql, [pageSize, (page - 1) * pageSize]);

  let categorylist = [];
  if (resultData[0].length > 0) {
    resultData[0].forEach((element) => {
      let category = { id: 0 };
      category.id = element.ID;
      category.categoryName = element.CategoryName;
      category.level = element.Level;
      category.parentID = element.ParentID;
      category.notes = element.Notes;
      categorylist.push(category);
    });
  }
  return {
    isSuccess: true,
    message: "",
    data: { items: categorylist, total: total },
  };
};

// const deleteCourseCategoryByBatchAsync=async(ids)=>{
//   console.log(11111,ids)
//   const idsString = ids.join(',');
//   let sql=`DELETE FROM coursecategories WHERE ID IN (${idsString});`
//   await db.query(sql)
//   return { isSuccess: true, msg: "course category delete successfully", data: null }
// }

const deleteCourseCategoryByBatchAsync = async (ids) => {
  if (!ids || ids.length == 0) {
    return { isSuccess: false, msg: "id is missing" };
  }

  const connection = await db.getConnection();

  const checkParentIdSql =
    "Select count(*) as count from coursecategories where ParentID=?";
  const checkCourse =
    "Select count(*) as count from courses where CategoryID=? ";
  const deleteSql = "Delete FROM coursecategories WHERE ID = ? ;";
  try {
    await connection.beginTransaction();

    for (let i = 0; i < ids.length; i++) {
      let courseCategoryId = parseInt(ids[i]);
      logger.info(
        `Starting transaction to delete category with ID: ${courseCategoryId}`
      );
      const [result] = await connection.query(checkParentIdSql, [
        courseCategoryId,
      ]);
      if (result[0].count !== 0) {
        logger.warn(
          `Category with ID: ${courseCategoryId} has child categories, deletion not allowed.`
        );
        throw new Error(
          "This category is the parent class of other course categories, which cannot be deleted"
        );
      }

      const [result1] = await connection.query(checkCourse, [courseCategoryId]);
      if (result1[0].count !== 0) {
        logger.warn(
          `Category with ID: ${courseCategoryId} has associated courses, deletion not allowed.`
        );

        throw new Error(
          "This category is the parent class of other course, which cannot be deleted"
        );
      }
      const [rows] = await connection.query(deleteSql, [courseCategoryId]);
      if (rows.affectedRows === 0) {
        logger.warn(`Category with ID: ${courseCategoryId} does not exist.`);
      }
    }
    await connection.commit();
    logger.info(`Category with ID: ${courseCategoryId} deleted successfully.`);

    return {
      isSuccess: true,
      msg: "course category delete successfully",
      data: null,
    };
  } catch (error) {
    await connection.rollback();
    logger.error(`Error deleting category  - ${error.message}`);
  } finally {
    connection.release();
    logger.info("Transaction complete for deleting category ");
  }
  return {
    isSuccess: false,
    msg: "Delete failed",
    data: null,
  };
};

module.exports = {
  getCourseCategoryById,
  getAllCourseCategoryAsync,
  deleteCourseCategoryByIdAsync,
  addCourseCategoryAsync,
  updateCourseCategoryAsync,
  getAllCourseCategoryByPage,
  deleteCourseCategoryByBatchAsync,
  getAllCourseCategoryLevelAsync
};
