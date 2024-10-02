var express = require("express");
require('express-async-errors');
var router = express.Router();

const { body, query, param } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");

var usercontroller = require("../controller/usercontroller");

// Get whole set of users
/**
 * @openapi
 * '/api/users':
 *  get:
 *     tags:
 *     - User
 *     summary: Get whole set of users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *      200:
 *        description: Users data fetched successfully
 *      404:
 *        description: No users found
 *      500:
 *        description: Server error
 */
 router.get("/", usercontroller.getWholeUsersAsync);

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
 router.post(
  "",
  commonValidate([
    body("username").notEmpty().withMessage("username invalid"),
    body("password").notEmpty().isLength({ min: 8 }),
    body("email").isEmail().withMessage("email address invalid"),
    body("access")
      .notEmpty()
      .isIn(["admin", "student", "teacher"])
      .withMessage("access invalid"),
  ]),
  usercontroller.addUserAsync
);
 

//delete
/**
 * @openapi
 * '/api/users/{ids}':
 *  delete:
 *     tags:
 *     - User Controller
 *     summary: delete a user by Id
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id of the user
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
 router.delete(
  "/:ids",
  param([param("ids").notEmpty().withMessage("Invalid User id")]),
  usercontroller.deleteUserByIdAsync
);
//search by name
/**
 * @openapi
 * '/api/users/getUser':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get a user by name
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *      - name: username
 *       in: query
 *       description: The name of the user
 *       required: true
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
  "/getUser",
  commonValidate([
    query("username").notEmpty().withMessage("Not a valid username"),
  ]),
  usercontroller.getUserAsync
);

//update
/**
  * @openapi
 * '/api/users/{id}':
 *  put:
 *     tags:
 *     - User Controller
 *     summary: Update user info by id
 *     security:
 *      - BearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The ID of the user which need to be updated
 *        required: true
 *        schema:
 *          type: integer
 *     requestBody:
 *       description: The data required to update the user
 *       required: true
 *     content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *              address:
 *                type: string
 *              age:
 *                type: integer
 *              gender:
 *                type: integer
 *              avatar:
 *                type: string
 *                example: url-to-avatar
 *              nickname:
 *                type: string
 *              access:
 *                type: integer
 *              active:
 *                type: integer
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
    body("username").notEmpty().withMessage("Not a valid username"),
    param("id").notEmpty().isInt({ min: 1 }).withMessage("Not a valid id"),
  ]),
  usercontroller.updateUserAsync
);



/**
 * @openapi
 * '/api/users/{page}/{pageSize}':
 *  get:
 *     tags:
 *     - User Controller
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
  usercontroller.getUserListAsync
);

/**
 * @openapis
 * '/api/users/getUserById':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get a user by id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: id
 *        in: query
 *        description: The id of the user
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
 router.get("/getUserById",
 commonValidate([
   query("id").notEmpty().withMessage("Not a valid id"),
 ]),
 usercontroller.getUserByIdAsync
);


module.exports = router;

