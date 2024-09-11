const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController'); // Import the course controller
const { commonValidate } = require('../middleware/expressValidator'); // Import the validation middleware
const { check } = require('express-validator'); // Import the check function for validation
const { param } = require('express-validator');



// Define validation rules for creating a new course
const courseValidationRules = [
    check('CourseName').notEmpty().withMessage('Course Name is required'),
    check('CategoryID').isInt().withMessage('Category ID must be an integer'),
    // Add more validation rules as needed
];


/**
 * @openapi
 * '/api/courses':
 *  post:
 *     tags:
 *     - Course Controller
 *     summary: add course
 *     description: add course
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - CourseName
 *              - Description
 *              - CategoryID
 *              - Cover
 *              - PublishedAt
 *              - teacherId
 *            properties:
 *              CourseName:
 *                type: string
 *                default: Test1000
 *              Description:
 *                type: string
 *                default: Test1000
 *              CategoryID:
 *                type: integer
 *                default: 1
 *              Cover:
 *                type: string
 *                default: Cover
 *              PublishedAt:
 *                type: date-time
 *                default: "2024-08-10 12:00:00"
 *              teacherId:
 *                type: number
 *                default: 1
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.post('/', commonValidate(courseValidationRules), courseController.createCourse);

/**
 * @openapi
 * '/api/courses/{courseId}':
 *  put:
 *     tags:
 *     - Course Controller
 *     summary: Update Course
 *     description: update Course
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the course
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - CourseName
 *              - CategoryID
 *            properties:
 *              CourseName:
 *                type: string
 *                default: Test1000
 *              Description:
 *                type: string
 *                default: Test1000
 *              CategoryID:
 *                type: number
 *                default: 1
 *              Cover:
 *                type: string
 *                default: Cover
 *              PublishedAt:
 *                type: string
 *                default: "2024-08-19 12:00:00"
 *              teacherId:
 *                type: number
 *                default: 1
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.put('/:courseId', commonValidate(courseValidationRules), courseController.updateCourse);

/**
 * @openapi
 * '/api/courses/{courseId}':
 *  delete:
 *     tags:
 *     - Course Controller
 *     summary: delete courses by courseId
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: courseId
 *        in: path
 *        description: The ids of the courses
 *        required: true
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
router.delete('/:courseId', courseController.deleteCourseById);

router.get('/courselist', courseController.getAllCourses);
router.get('/:courseId', courseController.getCourseById);

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
    courseController.getAllCoursesByPage
  );


module.exports = router;







