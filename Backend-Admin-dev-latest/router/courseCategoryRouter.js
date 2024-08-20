const express = require('express');
const router = express.Router();
const courseCategoryController = require('../controller/courseCategoryController'); // Import the course controller
const { commonValidate } = require('../middleware/expressValidator'); // Import the validation middleware
const { check, body } = require('express-validator');


const courseCategoryRule=[
    check('courseCategoryId').optional().isInt().withMessage('Category ID must be an integer'),
]

router.post('/',courseCategoryController.addCourseCategoryAsync);
router.put('/:courseCategoryId',courseCategoryController.updateCourseCategoryAsync);
router.delete("/:courseCategoryId",courseCategoryController.deleteCourseCategoryByIdAsync);
router.get("/:courseCategoryId",courseCategoryController.getCourseCategoryByIdAsync)
router.get("/",courseCategoryController.getAllCourseCategoryAsync)
module.exports=router
