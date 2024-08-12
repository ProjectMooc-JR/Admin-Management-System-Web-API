var express = require("express");
require('express-async-errors');
var router = express.Router();

const { body, query, param } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");

//var usercontroller = require("../controller/usercontroller");
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
 * '/api/comments/get/{id}':
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
  "/get/:id",
  commonValidate([
    param("id")
      .notEmpty()
      .isInt({ allow_leading_zeroes: false, min: 1 })
      .withMessage("Not a valid id"),
  ]),
  commentcontroller.getCommentByIdAsync
)

/**
 * @openapi
 * '/api/comments/delete/{id}':
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
  "/delete/:id",
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
 * '/api/comments/add':
 *  post:
 *     tags:
 *     - Comments Controller
 *     summary: create a comment
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: body
 *         name: comment
 *         description: create a comment
 *         schema:
 *           type: object 
 *           required:
 *            - CourseID
 *            - CommentContent
 *            - CommentTime
 *            - UserID
 *           properties:
 *              CourseID:
 *                type: integer
 *              CommentContent:
 *                type: string
 *              CommentTime:
 *                type: DATE
 *              UserID:
 *                type: integer 
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
    "/add",
    commonValidate([
      body("CourseID")
        .notEmpty()
        .isInt({ allow_leading_zeroes: false, min: 1 })
        .withMessage("Not a valid CourseID"),
      body("CommentContent")
        .notEmpty()
        .isString()
        .withMessage("Not a valid CommentContent"),
      body("CommentTime")
        .notEmpty()
        .isDate()
        .withMessage("Not a valid CommentTime"),
      body("UserID")
        .notEmpty()
        .isInt({ allow_leading_zeroes: false, min: 1 })
        .withMessage("Not a valid UserID"),
    ]),
    commentcontroller.addCommentAsync
);

// router.post(
//     "/update",
//     commonValidate([
//       body("CommentID")
//         .notEmpty()
//         .isInt({ allow_leading_zeroes: false, min: 1 })
//         .withMessage("Not a valid CommentID"),
//       body("CourseID")
//         .notEmpty()
//         .isInt({ allow_leading_zeroes: false, min: 1 })
//         .withMessage("Not a valid CourseID"),
//       body("CommentContent")
//         .notEmpty()
//         .isString()
//         .withMessage("Not a valid CommentContent"),
//       body("CommentTime")
//         .notEmpty()
//         .isString()
//         .withMessage("Not a valid CommentTime"),
//       body("UserID")
//         .notEmpty()
//         .isInt({ allow_leading_zeroes: false, min: 1 })
//         .withMessage("Not a valid UserID"),
//     ]),
//     commentcontroller.updateCommentAsync
// );


module.exports = router;

