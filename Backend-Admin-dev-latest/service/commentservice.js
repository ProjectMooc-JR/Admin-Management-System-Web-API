const { db } = require("../db/mysqldb.js");


var getCommentListAsync = async (page, pageSize) => {
    let countSql = "SELECT count(*) total FROM coursecomments; ";
    let resultCount = await db.query(countSql);
    let total = resultCount[0][0].total;
    if (total == 0) {
      return { isSuccess: true, message: "", data: { items: [], total: 0 } };
    }
    let sql = "SELECT * FROM coursecomments ;";
    let resultData = await db.query(sql, [pageSize, (page - 1) * pageSize]);
  
    let commentlist = [];
    if (resultData[0].length > 0) {
      resultData[0].forEach((element) => {
        let comment = { id: 0 };
        comment.ID = element.ID;
        comment.CourseID = element.CourseID;
        comment.CommentContent = element.CommentContent;
        comment.CommentTime = element.CommentTime;
        comment.UserID = element.UserID;
        commentlist.push(comment);
      });
    }
    return {
      isSuccess: true,
      message: "",
      data: { items: commentlist, total: total },
    };
};

const getCommentByIdAsync = async (id) => { 
    let sql = "SELECT * FROM coursecomments WHERE ID = ?;";
    let resultData = await db.query(sql, [id]);
  
    
    // if (resultData[0].length > 0) {
    //   return { isSuccess: true, message: "success", data: { items: resultData[0] } };
    // } else {
    //   return { isSuccess: false, message: "failed" };
    
       
      
    //   // resultData[0].forEach((element) => {
    //   //   let comment = { id: 0 };
    //   //   comment.ID = element.ID;
    //   //   comment.CourseID = element.CourseID;
    //   //   comment.CommentContent = element.CommentContent;
    //   //   comment.CommentTime = element.CommentTime;
    //   //   comment.UserID = element.UserID;
    //   //   commentlist.push(comment);
    //   // });

    // }

    if (resultData[0].length > 0) {
      return { isSuccess: true, message: "success" };
    } else {
      return { isSuccess: false, message: "failed" };
    }  
}

const deleteCommentByIdAsync = async (id) => {
    let sql = "DELETE FROM coursecomments WHERE ID = ?;"; 
    let result = await db.query(sql, [id]);
    if (result[0].affectedRows > 0) {
      return { isSuccess: true, message: "success"};
    } else {
      return { isSuccess: false, message: "failed" };
    }                                    
};

const addCommentAsync = async(comment, page, pageSize) => {
    let sql = "INSERT INTO coursecomments (CourseID, CommentContent, CommentTime, UserID) VALUES (?,?,?,?)";
    let result = await db.query(sql, [comment.CourseID, comment.CommentContent, comment.CommentTime, comment.UserID]);
    if (result[0].affectedRows > 0) {
      return { 
        isSuccess: true, 
        message: "success",
        data: { items: result[0] } 
      };
    } else {
      return { 
        isSuccess: false, 
        message: "failed" 
      };
    }
}


module.exports = {
    getCommentListAsync,
    getCommentByIdAsync,
    addCommentAsync,
    deleteCommentByIdAsync,
};