// courseScheduleRouter.js
const express = require("express");
const router = express.Router();
const courseScheduleController = require("../controller/courseScheduleController");

// 定义路由

/**
 * @openapi
 * '/api/courseSchedule':
 *  get:
 *     tags:
 *     - Course Schedule
 *     summary: Get all Course Schedule
 *     security:
 *       - BearerAuth: []
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/", courseScheduleController.getCourseSchedulesAsync);
router.get("/:id", courseScheduleController.getCourseScheduleByIdAsync);

router.post("/", courseScheduleController.addCourseScheduleAsync);

module.exports = router;
