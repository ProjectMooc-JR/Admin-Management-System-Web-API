// courseScheduleRouter.js
const express = require("express");
const router = express.Router();
const courseScheduleController = require("../controller/courseScheduleController");

// 定义路由
/**
 * @openapi
 * '/api/courseSchedules/{id}':
 *  get:
 *     tags:
 *     - Course Schedule Controller
 *     summary: get course schedule by id
 *     description: get course schedule by id
 *     security:
 *     - BearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id
 *       required: true
 *     responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.get("/", courseScheduleController.getCourseSchedulesAsync);
router.get("/:id", courseScheduleController.getCourseScheduleByIdAsync);

router.post("/", courseScheduleController.addCourseScheduleAsync);
router.delete("/:id", courseScheduleController.deleteCourseScheduleAsync);

router.put("/:id", courseScheduleController.updateCourseScheduleAsync);

module.exports = router;
