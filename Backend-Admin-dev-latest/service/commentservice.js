const { db } = require("../db/mysqldb.js");

var getCommentListAsync = async (page, pageSize) => {
    let countSql = "SELECT count(*) total FROM coursecomments";
    let resultCount = await db.query(countSql);
    let total = resultCount[0][0].total;
    if (total == 0) {
      return { isSuccess: true, message: "", data: { items: [], total: 0 } };
    }
    let sql = `
      SELECT coursecomments.id, CourseName, CommentContent, CommentTime, username 
      FROM coursecomments
      INNER JOIN user
      ON user.id = coursecomments.UserID
      INNER JOIN courses
      ON courses.ID = coursecomments.CourseID
    `;
    let resultData = await db.query(sql, [pageSize, (page - 1) * pageSize]);
  
    let commentlist = [];
    if (resultData[0].length > 0) {
      resultData[0].forEach((element) => {
        let comment = { ID: 0 };
        comment.id = element.id;
        comment.username = element.username;
        comment.CourseName = element.CourseName;
        comment.CommentContent = element.CommentContent;
        comment.CommentTime = element.CommentTime;
        commentlist.push(comment);
      });
    }
    return {
      isSuccess: true,
      message: "",
      data: { items: commentlist, total: total },
    };
    //let sql = "SELECT * FROM coursecomments limit ? offset ?";
    // let resultData = await db.query(sql, [pageSize, (page - 1) * pageSize]);
  
    // let commentlist = [];
    // if (resultData[0].length > 0) {
    //   resultData[0].forEach((element) => {
    //     let comment = { ID: 0 };
    //     comment.id = element.id;
    //     comment.CourseID = element.CourseID;
    //     comment.CommentContent = element.CommentContent;
    //     comment.CommentTime = element.CommentTime;
    //     comment.UserID = element.UserID;
    //     commentlist.push(comment);
    //   });
    // }
    // return {
    //   isSuccess: true,
    //   message: "",
    //   data: { items: commentlist, total: total },
    // };
};

const getCommentByIdAsync = async (id) => { 
    let sql = "SELECT * FROM coursecomments WHERE id = ?";
    let resultData = await db.query(sql, [id]);

    if (resultData[0].length > 0) {
      return { isSuccess: true, message: "success", data: resultData[0][0] };
    } else {
      return { isSuccess: false, message: "failed", data: {} };
    }  
}

const deleteCommentByIdAsync = async (id) => {
    let sql = "DELETE FROM coursecomments WHERE id = ?"; 
    let result = await db.query(sql, [id]);
    if (result[0].affectedRows > 0) {
      return { isSuccess: true, message: "success"};
    } else {
      return { isSuccess: false, message: "failed" };
    }                                    
};

const addCommentAsync = async(comment) => {
    let sql = "INSERT INTO coursecomments (CourseID, CommentContent, CommentTime, UserID) VALUES (?,?,?,?)";
    let [result] = await db.query(sql, [comment.CourseID, comment.CommentContent, comment.CommentTime, comment.UserID]);
    if (result.affectedRows > 0) {
      return { 
        isSuccess: true, 
        message: "success",
      };
    } else {
      return { 
        isSuccess: false, 
        message: "failed" 
      };
    }
}

const updateCommentAsync = async (id, updatedComment) => {
  const {CourseID, CommentContent, CommentTime, UserID } = updatedComment;
  let sql = `
    UPDATE coursecomments 
    SET CourseID = ?, CommentContent = ?, CommentTime = ?,  UserID = ? 
    WHERE id =?
  `;
  const values = [CourseID, CommentContent, CommentTime, UserID, id];
  const [result] = await db.query(sql, values);

  try{
    if (result.affectedRows > 0) {
      return { isSuccess: true, message: "Updated successful" };
    }
    return { isSuccess: false, message: "Failed to update" };
  }catch(error){
    throw new Error(`Error updating comment: ${error.message}`);
  }
};

module.exports = {
    getCommentListAsync,
    getCommentByIdAsync,
    addCommentAsync,
    deleteCommentByIdAsync,
    updateCommentAsync
};