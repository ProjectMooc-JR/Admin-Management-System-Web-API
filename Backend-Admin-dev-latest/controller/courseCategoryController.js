const courseCategoryService = require("../service/courseCategoryService");


const addCourseCategoryAsync = async (req, res) => {
    let courseCategory = {
        CategoryName: req.body.categoryName,
        Level: req.body.level,
        ParentID: req.body.parentId,
        Notes: req.body.notes ? req.body.notes : "",
    };
    let result = await courseCategoryService.addCourseCategoryAsync(courseCategory);
    if (result.isSuccess) {
        res.sendCommonValue({}, "Teacher added successfully", 201);
    } else {
        res.sendCommonValue({}, "Failed to add teacher", 500);
    }
};


const getAllCourseCategoryAsync = async (req, res) => {
    const result = await courseCategoryService.getAllCourses();
    res.sendCommonValue(
        result.data,
        result.message,
        result.isSuccess ? 200 : 400
    );
};



const getCourseCategoryByIdAsync = async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await courseCategoryService.getCourseById(id);
    res.sendCommonValue(
      result.data,
      result.message,
      result.isSuccess ? 200 : 400
    );
  };
  
  const updateCourseCategoryAsync = async (req, res) => {
    let teacher = {};
    teacher.id = parseInt(req.params.id);
    teacher.specialization = req.body.specialization;
    teacher.description = req.body.description;
    teacher.hireDate = req.body.hireDate;
    teacher.hireStatus = req.body.hireStatus === "true";
  
  
    let result = await teacherService.updateTeacherAsync(teacher);
    if (result.isSuccess) {
      res.sendCommonValue({}, "Teacher updated successfully", 200);
    } else {
      res.sendCommonValue({}, "Failed to update teacher", 400);
    }
  };
  
  const deleteCourseCategoryByIdAsync = async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await teacherService.deleteTeacherByIdAsync(id);
    res.sendCommonValue(
      result.data,
      result.message,
      result.isSuccess ? 200 : 400
    );
  };

  module.exports={
    addCourseCategoryAsync,
    getAllCourseCategoryAsync,
    getCourseCategoryByIdAsync,
    updateCourseCategoryAsync,
    deleteCourseCategoryByIdAsync
  }