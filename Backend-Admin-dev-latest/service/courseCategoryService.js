const { db } = require("../db/mysqldb.js");

const addCourseCategoryAsync = async (courseCategory) => {
    const { CategoryName, Level, ParentID, Notes } = course;
    const query = "INSERT INTO coursecategories (CategoryName, Level, ParentID, Notes) VALUES (?, ?, ?, ?);";

    const values = [
        CategoryName,
        Level,
        ParentID,
        Notes
    ];

    try {
        const [result] = await db.query(query, values);
        return {isSuccess:true,msg:"insert successfully",data:result.insertId};
    } catch (error) {
        return {isSuccess:false,msg:error.message,data:null}
    }
};

const updateCourseCategoryAsync = async (courseId, updatedCourse) => {
    const { CategoryName, Level, ParentID, Notes } = updatedCourse;
    const query = "UPDATE coursecategories SET CategoryName = ?, Level = ?, ParentID = ?, Notes = ? WHERE ID = ? ;";
    const values = [CategoryName, Level, CategoryID, ParentID, Notes];
    try {
        const [result] = await db.query(query, values);
        return {isSuccess:true,msg:"insert successfully",data:result};
    } catch (error) {
        return {isSuccess:false,msg:error.message,data:null}
    }
};

const deleteCourseCategoryByIdAsync = async (courseId) => {
    const query = "DELETE FROM coursecategories WHERE ID = ? ;";
  
    try {
      const [result] = await db.query(query, [courseId]);
      if (result.affectedRows === 0) {
        return {isSuccess:false,msg:"course category not found",data:null}
      }
      return {isSuccess:true,msg:"insert successfully",data:result};
    } catch (error) {
      throw new Error(`Error deleting course: ${error.message}`);
    }
  };

// Get all courses
const getAllCourses = async () => {
    const query = "SELECT  * FROM coursecategories";
    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching courses: ${error.message}`);
    }
  };

  //Get course by ID
const getCourseById = async (courseId) => {
    const query = "SELECT * FROM coursecategories WHERE ID = ?";
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
  module.exports={
    getCourseById,
    getAllCourses,
    deleteCourseCategoryByIdAsync,
    addCourseCategoryAsync
  }