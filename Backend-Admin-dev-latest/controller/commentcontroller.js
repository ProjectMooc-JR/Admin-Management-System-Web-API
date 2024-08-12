//const userservice = require("../service/userservice");
const commentservice = require("../service/commentservice");
const { bcryptConfig } = require("../appConfig");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { add } = require("winston");

//get comment list by page and pagesize
const getCommentListAsync = async (req, res) => {
    let page = parseInt(req.params.page);
    let pageSize = parseInt(req.params.pageSize);
    let result = await commentservice.getCommentListAsync(page, pageSize);
    if (result.isSuccess) {
      res.sendCommonValue(result.data, "success", 1);
    } else {
      res.sendCommonValue([], "failed", 0);
    }
};

//get comment by id
const getCommentByIdAsync = async (req, res) => {
    let id = parseInt(req.params.id);
    let result = await commentservice.getCommentByIdAsync(id);
    return (result.isSuccess) ? res.sendCommonValue([], "success", 1)
      : res.sendCommonValue([], "failed", 0);
    // if (result.isSuccess) {
    //   res.sendCommonValue([], "success", 1);
    // } else {
    //   res.sendCommonValue([], "failed", 0);
    // }
}


//delete comment by id
const deleteCommentByIdAsync = async (req, res) => {
    let id = parseInt(req.params.id);
    let result = await commentservice.deleteCommentByIdAsync(id);
    return (result.isSuccess) ? res.sendCommonValue([], "success", 1)
      : res.sendCommonValue([], "failed", 0);
};

//add comment 
// const addCommentAsync = async (req, res) => {
//     let comment = req.body;
//     let result = await commentservice.addCommentAsync(comment);
//     return (result.isSuccess) ? res.sendCommonValue(result.data, "success", 1)
//       : res.sendCommonValue([], "failed", 0);
// };

const addCommentAsync = async (req, res) => {
  let comment ={};
  comment.CourseID = req.body.CourseID;
  comment.CommentContent = req.body.CommentContent;
  comment.CommentTime = req.body.CommentTime;
  comment.UserID = req.body.UserID;
  let result = await commentservice.addCommentAsync(comment);
  if (result.isSuccess) {
    res.sendCommonValue(result.data, "success", 1);
  } else {
    res.sendCommonValue([], "failed", 0);
  }
}



module.exports ={
    getCommentListAsync,
    getCommentByIdAsync,
    addCommentAsync,
    deleteCommentByIdAsync
}