var express = require("express");
require("express-async-errors");
var router = express.Router();

const { body, query, param } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");

const teacherController = require("../controller/teacherController");

// 添加教师信息的router：
router.post(
  "/",
  commonValidate([
    body("User_id").notEmpty().withMessage("User_id is required"),
    body("Specialization").notEmpty().withMessage("Specialization is required"),
    body("Description").notEmpty().withMessage("Description is required"),
    body("HireDate").optional().isDate().withMessage("Invalid HireDate"),
    body("HireStatus").optional().isBoolean().withMessage("Invalid HireStatus"),
  ]),
  teacherController.addTeacherAsync
);

/**
 * @openapi
 * '/api/teachers':
 *  get:
 *     tags:
 *     - teacher Controller
 *     summary: Get all teachers
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
router.get("/", teacherController.getAllTeachersAsync);

// 根据ID获取教师信息的router：
router.get(
  "/:id",
  commonValidate([
    param("id")
      .notEmpty()
      .isInt({ allow_leading_zeroes: false })
      .withMessage("Invalid teacher ID"),
  ]),
  teacherController.getTeacherByIdAsync
);

// 根据ID更新教师信息的router：
router.put(
  "/:id",
  commonValidate([
    param("id")
      .notEmpty()
      .isInt({ allow_leading_zeroes: false })
      .withMessage("Invalid teacher ID"),
    body("specialization")
      .optional()
      .notEmpty()
      .withMessage("Specialization is required"),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Description is required"),
    body("hireDate").optional().isDate().withMessage("Invalid HireDate"),
    body("hireStatus").optional().isBoolean().withMessage("Invalid HireStatus"),
  ]),
  teacherController.updateTeacherAsync
);

// 根据ID删除教师信息的router：
router.delete(
  "/:id",
  commonValidate([
    param("id")
      .notEmpty()
      .isInt({ allow_leading_zeroes: false })
      .withMessage("Invalid teacher ID"),
  ]),
  teacherController.deleteTeacherByIdAsync
);

module.exports = router;
