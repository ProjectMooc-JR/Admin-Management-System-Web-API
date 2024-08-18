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
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CourseName:
 *                 type: string
 *                 description: Name of the course
 *                 example: "Introduction to JavaScript"
 *               Description:
 *                 type: string
 *                 description: Detailed description of the course
 *                 example: "A beginner's guide to JavaScript."
 *               CategoryID:
 *                 type: integer
 *                 description: Category ID the course belongs to
 *                 example: 1
 *               Cover:
 *                 type: string
 *                 description: URL or path to the course cover image
 *                 example: "https://example.com/course-cover.jpg"
 *               PublishedAt:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time when the course was published
 *                 example: "2024-08-10T12:00:00Z"
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Bad request with validation errors
 *       500:
 *         description: Internal server error
 */
router.post('/', commonValidate(courseValidationRules), courseController.createCourse);
router.put('/:courseId', commonValidate(courseValidationRules), courseController.updateCourse);
router.delete('/:courseId', courseController.deleteCourseByIdAsync);
router.get('/:courseId', courseController.getCourseById);

module.exports = router;







