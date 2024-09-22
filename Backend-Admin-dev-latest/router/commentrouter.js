var express = require("express");
require('express-async-errors');
var router = express.Router();

const { body, query, param } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");

var commentcontroller = require("../controller/commentcontroller");

/**
 * @openapi
 * '/api/comments/{page}/{pageSize}':
 *  get:
 *     tags:
 *     - Comments Controller
 *     summary: Get all comments
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
    commentcontroller.getCommentListAsync  
);

/**
 * @openapi
 * '/api/comments/{id}':
 *  get:
 *     tags:
 *     - Comments Controller
 *     summary: Get comments by id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: id of comment
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
router.get(
  "/:id",
  commonValidate([
    param("id")
      .notEmpty()
      .isInt({ allow_leading_zeroes: false })
      .withMessage("Not a valid id"),
  ]),
  commentcontroller.getCommentByIdAsync
)

/**
 * @openapi
 * '/api/comments/{id}':
 *  delete:
 *     tags:
 *     - Comments Controller
 *     summary: Delete comments by id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: id of comment
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
  commentcontroller.deleteCommentByIdAsync
);

/**
 * @openapi
 * '/api/comments/':
 *  post:
 *     tags:
 *     - Comments Controller
 *     summary: create a comment
 *     security:
 *       - BearerAuth: []
 *     requestBody:
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
 *               CommentContent:
 *                 type: string
 *                 required: false
 *                 description: content of the comment
 *                 example: "This is a comment"
 *               CommentTime:
 *                 type: date-time
 *                 required: false
 *                 description: time of the comment
 *                 example: "2021-09-01"
 *               UserID:
 *                 type: integer
 *                 required: true
 *                 description: ID of the user
 *                 example: 1
 *     responses:
 *      201:
 *        description: Created Successfully
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post(
    "/",
    commonValidate([
     
      // body("Course_id")
      // //body("CourseID")
        
      //   .isInt({ allow_leading_zeroes: false})
      //   .withMessage("Not a valid CourseID"),
      body("CommentContent")
        .optional()
        .isString()
        .withMessage("Not a valid CommentContent"),
      body("User_id").notEmpty().withMessage("User_id is required"), 
      body("Course_id").notEmpty().withMessage("Course_id is required"),
      // body("User_id")  
      //body("UserID")
        
        // .isInt({ allow_leading_zeroes: false, min: 1 })
        // .withMessage("Not a valid UserID"),
    ]),
    commentcontroller.addCommentAsync
);


/**
 * @openapi
 * '/api/comments/{id}':
 *  put:
 *     tags:
 *     - Comments Controller
 *     summary: Update a comment
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of comment
 *        required: true
 *     requestBody:
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
 *               CommentContent:
 *                 type: string
 *                 required: false
 *                 description: content of the comment
 *                 example: "This is a comment"
 *               CommentTime:
 *                 type: date-time
 *                 required: false
 *                 description: time of the comment
 *                 example: "2021-09-01"
 *               UserID:
 *                 type: integer
 *                 required: true
 *                 description: ID of the user
 *                 example: 1
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
router.put(
  "/:id",
  commonValidate([
    param("id")
      .notEmpty()
      .isInt({ allow_leading_zeroes: false })
      .withMessage("Invalid ID"),
    body("CourseID")
      .notEmpty()
      .withMessage("CourseID is required"),
    body("CommentContent")
      .optional()
      .notEmpty()
      .withMessage("CommentContent is required"),
    body("CommentTime").optional().isDate().withMessage("Invalid CommentTime"),
    body("UserID").isInt().withMessage("Invalid UserID"),  
  ]),
  commentcontroller.updateCommentAsync
);

// router.put(
//   "/:id",
//   commonValidate([
//     param("id")
//       .notEmpty()
//       .isInt({ allow_leading_zeroes: false })
//       .withMessage("Invalid teacher ID"),
//     body("specialization")
//       .optional()
//       .notEmpty()
//       .withMessage("Specialization is required"),
//     body("description")
//       .optional()
//       .notEmpty()
//       .withMessage("Description is required"),
//     body("hireDate").optional().isDate().withMessage("Invalid HireDate"),
//     body("hireStatus").optional().isBoolean().withMessage("Invalid HireStatus"),
//   ]),
//   teacherController.updateTeacherAsync
// );


module.exports = router;

