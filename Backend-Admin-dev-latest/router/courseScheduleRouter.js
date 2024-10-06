// courseScheduleRouter.js
const express = require("express");
const router = express.Router();
const courseScheduleController = require("../controller/courseScheduleController");

const { body, query, param } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");

router.use(express.json());

// 定义路由，get all the course schedule information with pagination
/**
 * @openapi
 * '/api/courseSchedule/{page}/{pageSize}':
 *  get:
 *     tags:
 *     - Course Schedule Controller
 *     summary: get course schedule
 *     description: get course schedule with pagination
 *     security:
 *     - BearerAuth: []
 *     parameters:
 *     - name: page
 *       in: path
 *       description: Page number
 *       required: true
 *       schema:
 *         type: integer
 *     - name: pageSize
 *       in: path
 *       description: Number of course schedules
 *       required: true
 *       schema:
 *         type: integer
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
  courseScheduleController.getCourseSchedulesAsync
);
//根据ID获取courseSchedule的router
/**
 * @openapi
 * '/api/courseSchedule/{id}':
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
router.get(
  "/:id",
  commonValidate([
    param("id")
      .notEmpty()
      .isInt({ allow_leading_zeroes: false })
      .withMessage("Invalid Course Schedule ID"),
  ]),
  courseScheduleController.getCourseScheduleByIdAsync
);
// // 添加courseSchedule的router：
// /**
//  * @openapi
//  * '/api/courseSchedule':
//  *  post:
//  *     tags:
//  *     - Course Schedule Controller
//  *     summary: Add a course Schedule
//  *     security:
//  *       - BearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               CourseID:
//  *                 type: integer
//  *                 required: true
//  *                 description: ID of the course
//  *                 example: 10
//  *               StartDate:
//  *                 type: date-time
//  *                 required: true
//  *               EndDate:
//  *                 type: date-time
//  *                 required: true
//  *               isPublished:
//  *                 type: boolean
//  *     responses:
//  *      201:
//  *        description: Course Schedule added successfully
//  *      400:
//  *        description: Bad Request
//  *      500:
//  *        description: Server Error
//  */

// router.post(
//   "/",
//   commonValidate([
//     body("CourseId")
//       .isInt({ allow_leading_zeroes: false })
//       .withMessage("Not a valid CourseID"),
//     body("startDate").optional().isDate().withMessage("Not a valid StartDate"),
//     body("endDate").optional().isDate().withMessage("Not a valid EndDate"),
//     body("isPublished").isBoolean().withMessage("Publish or not"),
//   ]),
//   courseScheduleController.addCourseScheduleAsync
// );

//delete the course Schedule
/**
 * @openapi
 * '/api/courseSchedule/delete/{id}':
 *  delete:
 *     tags:
 *     - Course Schedule Controller
 *     summary: Delete course schedule by id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: id of course Schedule
 *        required: true
 *     responses:
 *      200:
 *        description: Deleted Successfully
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete(
  "/:id",
  commonValidate([
    param("id")
      .notEmpty()
      .isInt({ allow_leading_zeroes: false, min: 1 })
      .withMessage("Not a valid id"),
  ]),
  courseScheduleController.deleteCourseScheduleAsync
);
//Add a course Schedule 添加
/**
 * @openapi
 * '/api/courseSchedule/':
 *  post:
 *     tags:
 *     - Course Schedule Controller
 *     summary: Add a course Schedule
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id
 *         required: true
 *         schema:
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CourseID:
 *                 type: integer
 *                 required: true
 *                 description: ID of the course schedule
 *                 example: 10
 *               StartDate:
 *                 type: date-time
 *                 required: true
 *                 example: 2024-08-20
 *               EndDate:
 *                 type: date-time
 *                 required: true
 *                 example: 2025-08-20
 *               isPublished:
 *                 type: boolean
 *
 *     responses:
 *      201:
 *        description: CourseSchedule Created successfully
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */

router.post(
  "/",
  commonValidate([
    body("CourseId").notEmpty().withMessage("CourseID is required"),
    body("startDate").optional().isDate().withMessage("Invalid StartDate"),
    body("endDate").optional().isDate().withMessage("Invalid EndDate"),
    body("isPublished").isBoolean().withMessage("Invalid"),
  ]),
  // (req, res, next) => {
  //   console.log(req.body);
  //   next();
  // },
  courseScheduleController.addCourseScheduleAsync
);

//Update a course Schedule
/**
 * @openapi
 * '/api/courseSchedule/{id}':
 *  put:
 *     tags:
 *     - Course Schedule Controller
 *     summary: Update a course Schedule
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of course schedule
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CourseID:
 *                 type: integer
 *                 required: true
 *                 description: ID of the course
 *                 example: 10
 *               StartDate:
 *                 type: date-time
 *                 required: true
 *                 example: 2024-08-20
 *               EndDate:
 *                 type: date-time
 *                 required: true
 *                 example: 2025-08-20
 *               isPublished:
 *                 type: boolean
 *
 *     responses:
 *      201:
 *        description: CourseSchedule Updated successfully
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
      .withMessage("Invalid ID"),
    body("CourseId").notEmpty().withMessage("CourseID is required"),
    body("startDate").optional().isDate().withMessage("Invalid StartDate"),
    body("endDate").optional().isDate().withMessage("Invalid EndDate"),
    body("isPublished").isBoolean().withMessage("Invalid"),
  ]),
  // (req, res, next) => {
  //   console.log(req.body);
  //   next();
  // },
  courseScheduleController.updateCourseScheduleAsync
);

module.exports = router;
