var express = require("express");
require('express-async-errors');
var router = express.Router();

const { body, query, param } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");

var usercontroller = require("../controller/usercontroller");

//add user
/**
 * @openapi
 * '/api/users':
 *  post:
 *     tags:
 *     - User
 *     summary: Add a new user
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               age:
 *                 type: number
 *               gender:
 *                 type: number
 *               avatar:
 *                 type: string
 *               nickname:
 *                 type: string
 *               access:
 *                 type: string
 *               active:
 *                 type: number
 *     responses:
 *      201:
 *        description: Teacher added successfully
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
 router.post("",
 commonValidate([
   body("username").notEmpty().withMessage("username invalid"),
   body("password").notEmpty().isLength({ min: 8 }),
   body("email").isEmail().withMessage("email address invalid"),
   body("access").notEmpty().isIn(["admin", "student", "teacher"]).withMessage("access invalid"),
 ]),
 usercontroller.addUserAsync
);
 

/**
 * @openapi
 * '/api/users/{id}':
 *  delete:
 *     tags:
 *     - User
 *     summary: Delete a user by Id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the user
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *      200:
 *        description: Teacher updated successfully
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
router.delete(
  "/:ids",
  param([param("ids").notEmpty().withMessage("Invalid User id")]),
  usercontroller.deleteUserByIdAsync
);

/**
 * @openapi
 * '/api/users/{page}/{pageSize}':
 *  get:
 *     tags:
 *     - User
 *     summary: Get all users
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
  usercontroller.getUserAsync
);


module.exports = router;