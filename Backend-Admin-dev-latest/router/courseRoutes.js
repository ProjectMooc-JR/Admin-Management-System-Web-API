const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController'); // Import the course controller
const { commonValidate } = require('../middleware/expressValidator'); // Import the validation middleware
const { check } = require('express-validator'); // Import the check function for validation
const { param } = require('express-validator');

const multer  = require('multer')
const upload = multer({ dest: 'public/videos/' })

// Define validation rules for creating a new course
const courseValidationRules = [
    check('CourseName').notEmpty().withMessage('Course Name is required'),
    check('CategoryID').isInt().withMessage('Category ID must be an integer'),
    // Add more validation rules as needed
];

/**
 * @openapi
 * /api/teachers:
 *   get:
 *     tags:
 *       - Course Controller
 *     summary: 获取所有教师
 *     description: 获取所有教师信息，包括TeacherID和对应的username
 *     security:
 *       - BearerAuth: []  # 添加 Bearer token 验证
 *     responses:
 *       200:
 *         description: 成功获取教师列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   TeacherID:
 *                     type: integer
 *                     description: 教师的唯一ID
 *                   username:
 *                     type: string
 *                     description: 教师的用户名
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *       500:
 *         description: 服务器错误
 */
router.get('/all-teachers', courseController.getTeachers);



// Create a new course
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
router.post('/', upload.single('file'),courseController.createCourse);

// Update a course
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

// Delete a course
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
router.delete('/:courseId', commonValidate(courseValidationRules), courseController.deleteCourseById);

// Get a course by ID
/**
 * @openapi
 * '/api/courses/{courseId}':
 *  get:
 *     tags:
 *     - Course Controller
 *     summary: Get course by ID
 *     description: Retrieve a course's details by its ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the course to retrieve
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                courseId:
 *                  type: integer
 *                  example: 1
 *                CourseName:
 *                  type: string
 *                  example: Test1000
 *                Description:
 *                  type: string
 *                  example: Test1000
 *                CategoryID:
 *                  type: integer
 *                  example: 1
 *                Cover:
 *                  type: string
 *                  example: Cover
 *                PublishedAt:
 *                  type: string
 *                  format: date-time
 *                  example: "2024-08-10T12:00:00Z"
 *                teacherId:
 *                  type: integer
 *                  example: 1
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Course not found
 *      500:
 *        description: Server Error
 */
router.get('/:courseId', courseController.getCourseById);


/**
 * @openapi
 * '/api/courses':
 *  get:
 *     tags:
 *     - Course Controller
 *     summary: Get all courses with pagination
 *     security:
 *     - BearerAuth: []
 *     description: Retrieve a list of courses with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: The page number to retrieve
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: The number of courses per page
 *     responses:
 *       200:
 *         description: Successfully retrieved courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           CourseName:
 *                             type: string
 *                           Description:
 *                             type: string
 *                           CategoryID:
 *                             type: integer
 *                           Cover:
 *                             type: string
 *                           PublishedAt:
 *                             type: string
 *                             format: date-time
 *                     total:
 *                       type: integer
 *                       description: The total number of courses
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
router.get("/", courseController.getAllCourses);

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







