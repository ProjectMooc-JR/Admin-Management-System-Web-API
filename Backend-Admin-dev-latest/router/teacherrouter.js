var express = require("express");
require("express-async-errors");
var router = express.Router();

const { body, query, param } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");

const teacherController = require("../controller/teacherController");

//===============================================================================================//
// 【！！！IMPORTANT！！！】Ensure the exact route "/mobile/:MobileNum" is placed BEFORE the wildcard route "/:page/:pageSize"【！！！IMPORTANT！！！】
// 【This prevents the mobile number route from being mistakenly matched as a page parameter】
//===============================================================================================//

// Get a specific teacher's information by mobile number
/**
 * @openapi
 * '/api/teachers/mobile/{MobileNum}':
 *  get:
 *     tags:
 *     - Teacher Controller
 *     summary: Get teacher by MobileNum
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: MobileNum
 *        in: path
 *        description: Teacher's Mobile Number
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: Teacher data fetched successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get(
  "/mobile/:MobileNum",
  // commonValidate([
  //   param("MobileNum").notEmpty().withMessage("MobileNum is required"),
  // ]),
  teacherController.getTeacherByMobileNumAsync
);

//===============================================================================================//

// router of fetching all teachers' information with pagination

/**
 * @openapi
 * '/api/teachers/{page}/{pageSize}':
 *  get:
 *     tags:
 *     - Teacher Controller
 *     summary: Get all teachers with pagination and optional username
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: page
 *        in: path
 *        description: Page number
 *        required: true
 *        schema:
 *          type: integer
 *      - name: pageSize
 *        in: path
 *        description: Number of teachers per page
 *        required: true
 *        schema:
 *          type: integer
 *      - name: includeUserData
 *        in: query
 *        description: Include username in the response
 *        required: false
 *        schema:
 *          type: boolean
 *     responses:
 *      200:
 *        description: Fetched successfully
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */

router.get(
  "/:page/:pageSize",
  commonValidate([
    param("page")
      .notEmpty()
      .isInt({ allow_leading_zeroes: false, min: 1 })
      .withMessage("Not a valid page"),
    param("pageSize")
      .notEmpty()
      .isInt({ allow_leading_zeroes: false, min: 1 })
      .withMessage("Not a valid page"),
  ]),
  teacherController.getAllTeachersAsync
);

//===============================================================================================//
// 添加教师信息的router：

/**
 * @openapi
 * '/api/teachers':
 *  post:
 *     tags:
 *     - Teacher Controller
 *     summary: Add a new teacher
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               User_id:
 *                 type: integer
 *               Specialization:
 *                 type: string
 *               Description:
 *                 type: string
 *               HireDate:
 *                 type: string
 *                 format: date
 *               HireStatus:
 *                 type: boolean
 *               MobileNum:
 *                 type: string
 *               LinkedInLink:
 *                 type: string
 *
 *     responses:
 *      201:
 *        description: Teacher added successfully
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
router.post(
  "/",
  commonValidate([
    body("User_id").notEmpty().withMessage("User_id is required"),
    body("Specialization").notEmpty().withMessage("Specialization is required"),
    body("Description").notEmpty().withMessage("Description is required"),
    body("HireDate").optional().isDate().withMessage("Invalid HireDate"),
    body("HireStatus").optional().isBoolean().withMessage("Invalid HireStatus"),
    body("MobileNum").notEmpty().withMessage("Mobile number is required"),
    body("LinkedInLink").notEmpty().withMessage("LinkedIn link is required"),
  ]),
  teacherController.addTeacherAsync
);

//===============================================================================================//
// 根据ID获取教师信息的router：

/**
 * @openapi
 * '/api/teachers/{id}':
 *  get:
 *     tags:
 *     - Teacher Controller
 *     summary: Get teacher by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Teacher ID
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *      200:
 *        description: Teacher data fetched successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

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

//===============================================================================================//
// 根据ID更新教师信息的router：

/**
 * @openapi
 * '/api/teachers/{id}':
 *  put:
 *     tags:
 *     - Teacher Controller
 *     summary: Update teacher information
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Teacher ID
 *        required: true
 *        schema:
 *          type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Specialization:
 *                 type: string
 *               Description:
 *                 type: string
 *               HireDate:
 *                 type: string
 *                 format: date
 *               HireStatus:
 *                 type: boolean
 *               MobileNum:
 *                 type: string
 *               LinkedInLink:
 *                 type: string
 *     responses:
 *      200:
 *        description: Teacher updated successfully
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */

router.put(
  "/:id",
  commonValidate([
    param("id")
      .notEmpty()
      .isInt({ allow_leading_zeroes: false })
      .withMessage("Invalid teacher ID"),
    body("Specialization")
      .optional()
      .notEmpty()
      .withMessage("Specialization is required"),
    body("Description")
      .optional()
      .notEmpty()
      .withMessage("Description is required"),
    body("HireDate").optional().isDate().withMessage("Invalid HireDate"),
    body("HireStatus").optional().isBoolean().withMessage("Invalid HireStatus"),
    body("MobileNum")
      .optional()
      .notEmpty()
      .withMessage("Mobile number is required"),
    body("LinkedInLink")
      .optional()
      .notEmpty()
      .withMessage("LinkedIn link is required"),
  ]),
  teacherController.updateTeacherAsync
);

//===============================================================================================//
// 根据ID删除教师信息的router：

/**
 * @openapi
 * '/api/teachers/{id}':
 *  delete:
 *     tags:
 *     - Teacher Controller
 *     summary: Delete a teacher by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Teacher ID
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *      200:
 *        description: Teacher deleted successfully
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */

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
