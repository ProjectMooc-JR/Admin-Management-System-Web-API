const express = require("express");
const router = express.Router();
const courseScheduleService = require("../service/courseScheduleService");

const getCourseSchedulesAsync = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1; // set default to 1 if there's no page value provided
    const pageSize = parseInt(req.params.pageSize) || 10; // set default value of 10 items showing in one page
    const courseSchedules = await courseScheduleService.getCourseSchedulesAsync(
      page,
      pageSize
    );
    if (courseSchedules.isSuccess) {
      res.sendCommonValue(courseSchedules.data, "", 200, 200);
    } else {
      res.sendCommonValue({}, "Failed to fetch course schedules", 500, 500);
    }
    // res.status(200).json({
    //   success: true,
    //   data: courseSchedules,
    // });
  } catch (error) {
    console.error("Error fetching course schedules:", error);
    res.sendCommonValue({}, "Failed to fetch course schedules", 500, 500);
    // res.status(500).json({
    //   success: false,
    //   message: "Failed to fetch course schedules",
    // });
  }
};

const getCourseScheduleByIdAsync = async (req, res) => {
  const { id } = req.params;
  try {
    const courseSchedule =
      await courseScheduleService.getCourseScheduleByIdAsync(id);
    if (courseSchedule) {
      res.status(200).json({
        success: true,
        data: courseSchedule,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Course schedule not found",
      });
    }
  } catch (error) {
    console.error("Error fetching course schedule by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch course schedule",
    });
  }
};

const addCourseScheduleAsync = async (req, res) => {
  try {
    const courseScheduleData = req.body;
    const newCourseScheduleId =
      await courseScheduleService.addCourseScheduleAsync(courseScheduleData);
    res.status(201).json({
      success: true,
      data: { id: newCourseScheduleId },
      message: "Course schedule added successfully",
    });
  } catch (error) {
    console.error("Error adding course schedule:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add course schedule",
    });
  }
};

const updateCourseScheduleAsync = async (req, res) => {
  const { id } = req.params;
  const courseScheduleData = req.body;
  try {
    const affectedRows = await courseScheduleService.updateCourseScheduleAsync(
      id,
      courseScheduleData
    );
    if (affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "Course schedule updated successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Course schedule not found",
      });
    }
  } catch (error) {
    console.error("Error updating course schedule:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update course schedule",
    });
  }
};

// 删除课程计划
const deleteCourseScheduleAsync = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await courseScheduleService.deleteCourseScheduleAsync(
      id
    );
    if (affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "Course schedule deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Course schedule not found",
      });
    }
  } catch (error) {
    console.error("Error deleting course schedule:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete course schedule",
    });
  }
};

module.exports = {
  getCourseSchedulesAsync,
  getCourseScheduleByIdAsync,
  addCourseScheduleAsync,
  updateCourseScheduleAsync,
  deleteCourseScheduleAsync,
};
