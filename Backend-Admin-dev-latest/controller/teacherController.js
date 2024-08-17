const teacherService = require("../service/teacherservice.js");
const { bcryptConfig } = require("../appConfig");
const bcrypt = require("bcrypt");
const fs = require("fs");

// 添加教师
const addTeacherAsync = async (req, res) => {
  // 从客户端接收到用户提交的表单中获取对应信息：
  let teacher = {
    User_id: req.body.User_id,
    Specialization: req.body.Specialization,
    Description: req.body.Description,
    HireDate: req.body.HireDate,
    HireStatus: req.body.HireStatus === "true", //这里可以将字符串“true”转换成boolean值
  };
  console.log("Teacher data received:", teacher);

  // 调用teacherService里的addTeacherAsync函数将获取到的教师信息添加到数据库：
  let result = await teacherService.addTeacherAsync(teacher);
  console.log("Service result:", result);

  // 针对失败/成功返还对应数据给客户端：
  if (result.isSuccess) {
    res.sendCommonValue({}, "Teacher added successfully", 201);
  } else {
    res.sendCommonValue({}, "Failed to add teacher", 500);
  }
};

// 获取所有教师信息
const getAllTeachersAsync = async (req, res) => {
  // 调用 teacherService 的 getAllTeachersAsync 函数获取所有教师信息：
  const result = await teacherService.getAllTeachersAsync();
  // 返还所有教师信息给客户端：
  res.sendCommonValue(
    result.data,
    result.message,
    result.isSuccess ? 200 : 400
  );
};

// 根据ID获取教师信息
const getTeacherByIdAsync = async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await teacherService.getTeacherByIdAsync(id);
  res.sendCommonValue(
    result.data,
    result.message,
    result.isSuccess ? 200 : 400
  );
};

// 根据ID更新教师信息
const updateTeacherAsync = async (req, res) => {
  let teacher = {};
  teacher.id = parseInt(req.params.id);
  teacher.specialization = req.body.specialization;
  teacher.description = req.body.description;
  teacher.hireDate = req.body.hireDate;
  teacher.hireStatus = req.body.hireStatus === "true";

  // 检查教师的ID是否是有效的整数，如果不是有效的整数的话返回400错误
  if (!Number.isInteger(teacher.id)) {
    res.status(400).send({ message: "Invalid teacher ID" });
    return;
  }

  let result = await teacherService.updateTeacherAsync(teacher);
  if (result.isSuccess) {
    res.sendCommonValue({}, "Teacher updated successfully", 200);
  } else {
    res.sendCommonValue({}, "Failed to update teacher", 400);
  }
};

// 根据ID删除教师
const deleteTeacherByIdAsync = async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await teacherService.deleteTeacherByIdAsync(id);
  res.sendCommonValue(
    result.data,
    result.message,
    result.isSuccess ? 200 : 400
  );
};

module.exports = {
  addTeacherAsync,
  getAllTeachersAsync,
  getTeacherByIdAsync,
  updateTeacherAsync,
  deleteTeacherByIdAsync,
};
