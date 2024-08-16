const express = require('express');
const router = express.Router();
const courseCategoryController = require('../controller/courseCategoryController'); // Import the course controller
const { commonValidate } = require('../middleware/expressValidator'); // Import the validation middleware
const { check } = require('express-validator');



router.post('/',courseCategoryController.addCourseCategoryAsync);
router.put('/coursecategory/:courseCategoryId',courseCategoryController.updateCourseCategoryAsync);
router.delete("/coursecategory/:courseCategoryId",courseCategoryController.deleteCourseCategoryByIdAsync);
router.get("/:courseCategoryId",courseCategoryController.getCourseCategoryByIdAsync)
router.get("/",courseCategoryController.getAllCourseCategoryAsync)
module.exports=router
