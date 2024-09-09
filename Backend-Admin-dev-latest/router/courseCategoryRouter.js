const express = require('express');
const router = express.Router();
const courseCategoryController = require('../controller/courseCategoryController'); // Import the course controller
const { commonValidate } = require('../middleware/expressValidator'); // Import the validation middleware
const { check, body } = require('express-validator');


const courseCategoryRule=[
    check('courseCategoryId').optional().isInt().withMessage('Category ID must be an integer'),
]

/**
 * @openapi
 * '/api/courseCategory':
 *  post:
 *     tags:
 *     - course Category
 *     summary: Add a new courseCategory
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CategoryName:
 *                 type: string
 *               Level:
 *                 type: number
 *               ParentID:
 *                 type: number
 *               Notes:
 *                 type: string
 *     responses:
 *      201:
 *        description: courseCategory added successfully
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
router.post('/',courseCategoryController.addCourseCategoryAsync);
router.put('/:courseCategoryId',courseCategoryController.updateCourseCategoryAsync);
router.delete("/:courseCategoryId",courseCategoryController.deleteCourseCategoryByIdAsync);
router.get("/:courseCategoryId",courseCategoryController.getCourseCategoryByIdAsync)
router.get("/",courseCategoryController.getAllCourseCategoryAsync)
router.get("/:page/:pageSize",courseCategoryController.getAllCourseCategoryByPageAsync)
router.post("/mult-delete",courseCategoryController.deleteMutiCourseCategoryAsync)
module.exports=router