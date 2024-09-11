//const userservice = require("../service/userservice");
const commentservice = require("../service/commentservice");
const { bcryptConfig } = require("../appConfig");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { add } = require("winston");
const { count } = require("console");

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
    
    if (result.isSuccess) {
      res.sendCommonValue([result.data], "success", 1);
    } else {
      res.sendCommonValue([], "failed", 0);
    }
}

//delete comment by id
const deleteCommentByIdAsync = async (req, res) => {
    let id = parseInt(req.params.id);
    let result = await commentservice.deleteCommentByIdAsync(id);
    return (result.isSuccess) ? res.sendCommonValue([], "success", 1)
      : res.sendCommonValue([], "failed", 0);
};

const addCommentAsync = async (req, res) => {
  let comment ={
    CourseID: req.body.CourseID,
    CommentContent: req.body.CommentContent,
    CommentTime: req.body.CommentTime,
    UserID: req.body.UserID
  };

  let result = await commentservice.addCommentAsync(comment);

  if (result.isSuccess) {
    res.sendCommonValue([result], "success", 200);
  } else {
    res.sendCommonValue([], "failed", 500);
  }
}

const updateCommentAsync = async (req, res) => {
  const id = parseInt(req.params.id);
  const commentData = {
    CourseID: req.body.CourseID,
    CommentContent: req.body.CommentContent,
    CommentTime: req.body.CommentTime,
    UserID: req.body.UserID,
  };

  let updatedComment = await commentservice.updateCommentAsync(id, commentData);
  if (updatedComment.isSuccess) {
    res.sendCommonValue({updatedComment}, "Comment updated successfully", 200);
  } else {
    res.sendCommonValue({}, "Failed to update comment", 500);
  }
}

module.exports ={
    getCommentListAsync,
    getCommentByIdAsync,
    addCommentAsync,
    deleteCommentByIdAsync,
    updateCommentAsync
}