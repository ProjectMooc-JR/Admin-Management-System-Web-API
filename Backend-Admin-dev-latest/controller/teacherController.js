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
    MobileNum: req.body.MobileNum,
    LinkedInLink: req.body.LinkedInLink,
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
  // obtain pagination parameters from query
  const page = parseInt(req.params.page) || 1; // set default to 1 if there's no page value provided
  const pageSize = parseInt(req.params.pageSize) || 10; // set default value of 10 items showing in one page

  try {
    // call getAllTeachersAsync from service layer and pass in the pagination params
    const result = await teacherService.getAllTeachersAsync(page, pageSize);
    // return the result obtained from service layer to front end
    res.sendCommonValue(
      {
        items: result.data.items,
        result: result.data.total,
        page,
        pageSize,
      },
      result.message,
      result.isSuccess ? 200 : 400
    );
  } catch (error) {
    console.error("Error occurred in getAllTeachersAsync:", error);
    res.status(500).send({
      message: "Error occurred while fetching teachers' information",
      error: error.message,
    });
  }
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
  //teacher.User_id = parseInt(req.body.User_id);
  teacher.Specialization = req.body.Specialization;
  teacher.Description = req.body.Description;
  teacher.HireDate = req.body.HireDate;
  teacher.MobileNum = req.body.MobileNum;
  teacher.LinkedInLink = req.body.LinkedInLink;
  //teacher.HireStatus = parseInt(req.body.HireStatus);
  teacher.HireStatus = req.body.HireStatus === "true";

  console.log("updateTeacherAsync before await", teacher);
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

// Get a specific teacher's information by mobile number
const getTeacherByMobileNumAsync = async (req, res) => {
  const MobileNum = req.params.MobileNum;
  const result = await teacherService.getTeacherByMobileNumAsync(MobileNum);
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
  getTeacherByMobileNumAsync,
};
