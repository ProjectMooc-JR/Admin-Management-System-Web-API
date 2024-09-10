const express = require('express');
const router = express.Router();
const courseCategoryController = require('../controller/courseCategoryController'); // Import the course controller
const { commonValidate } = require('../middleware/expressValidator'); // Import the validation middleware
const { check, body } = require('express-validator');


const courseCategoryRule=[
    check('courseCategoryId').optional().isInt().withMessage('Category ID must be an integer'),
]

/**
<<<<<<< HEAD
* @openapi
* '/api/course-category/{courseCategoryId}':
*  put:
*     tags:
*     - Course Category
*     summary: Update a course category
*     description: Updates the course category with the given ID.
*     parameters:
*      - name: courseCategoryId
*        in: path
*        required: true
*        schema:
*          type: string
*          example: 123
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            properties:
*              CategoryName:
*                type: string
*                example: Science
*              Level:
*                type: string
*                example: Beginner
*              ParentID:
*                type: string
*                example: 456
*              Notes:
*                type: string
*                example: Updated notes
*     responses:
*      200:
*        description: Course category updated successfully
*      400:
*        description: Validation error
*
*  delete:
*     tags:
*     - Course Category
*     summary: Delete a course category
*     description: Deletes the course category with the given ID.
*     parameters:
*      - name: courseCategoryId
*        in: path
*        required: true
*        schema:
*          type: string
*          example: 123
*     responses:
*      200:
*        description: Course category deleted successfully
*      400:
*        description: Validation error
*
*  get:
*     tags:
*     - Course Category
*     summary: Get a course category by ID
*     description: Retrieves the details of a course category by its ID.
*     parameters:
*      - name: courseCategoryId
*        in: path
*        required: true
*        schema:
*          type: string
*          example: 123
*     responses:
*      200:
*        description: Course category retrieved successfully
*      400:
*        description: Validation error
*/

/**
* @openapi
* '/api/course-category/{page}/{pageSize}':
*  get:
 *     tags:
 *     - Course Category
 *     summary: Get all course categories
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: page
 *        in: path
 *        description: page
 *        required: true
 *      - name: pageSize
 *        in: path
 *        description: pageSize
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

router.post('/', commonValidate([
    body("CategoryName").notEmpty().withMessage("CategoryName is required"),
    body("Level").notEmpty().withMessage("Level is required"),
    body("ParentID").notEmpty().withMessage("ParentID is required"),
    body("Notes").optional()
]), courseCategoryController.addCourseCategoryAsync);

router.put('/:courseCategoryId', commonValidate([
    param("courseCategoryId").notEmpty().withMessage("courseCategoryId is required"),
    body("CategoryName").optional(),
    body("Level").optional(),
    body("ParentID").optional(),
    body("Notes").optional()
]), courseCategoryController.updateCourseCategoryAsync);

router.delete("/:courseCategoryId", commonValidate([
    param("courseCategoryId").notEmpty().withMessage("courseCategoryId is required"),
]), courseCategoryController.deleteCourseCategoryByIdAsync);

router.get("/:courseCategoryId", commonValidate([
    param("courseCategoryId").notEmpty().withMessage("courseCategoryId is required"),
]), courseCategoryController.getCourseCategoryByIdAsync)

router.get("/:page/:pageSize",commonValidate([
    param("page")
      .notEmpty()
      .isInt({ allow_leading_zeroes: false, min: 1 })
      .withMessage("Not a valid page"),
    param("pageSize")
      .notEmpty()
      .isInt({ allow_leading_zeroes: false, min: 1 })
      .withMessage("Not a valid page"),
]), courseCategoryController.getAllCourseCategoryAsync)


module.exports = router

=======
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
router.get("/courseCategoryLevel/:level",courseCategoryController.getAllCourseCategoryLevelAsync)
router.get("/:page/:pageSize",courseCategoryController.getAllCourseCategoryByPageAsync)
router.post("/mult-delete",courseCategoryController.deleteMutiCourseCategoryAsync)
module.exports=router
>>>>>>> 326eec3352bd7b0e1c56d10abf3d95e26b238be2
