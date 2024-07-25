var express = require("express");
var router = express.Router();
require('express-async-errors');

const { body } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");

var authcontroller = require("../controller/authcontroller");

/**
* @openapi
* '/api/auth/login':
*  post:
*     tags:
*     - Auth Controller
*     summary: Login as a user return token
*     description: login success get token
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - username
*              - password
*            properties:
*              username:
*                type: string
*                default: admin
*              password:
*                type: string
*                default: 123456
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
router.post(
  "/login",
  commonValidate([
    body("username")
      .notEmpty()
      .withMessage("Not a valid username")
      .isLength({ min: 3, max: 50 })
      .withMessage("The username length must be between 5 and 50"),
    body("password")
      .notEmpty()
      .withMessage("Not a valid password")
      .isLength({ min: 6, max: 50 })
      .withMessage("The password length must be between 6 and 50"),
  ]),
  authcontroller.loginAsync
);


module.exports = router;
