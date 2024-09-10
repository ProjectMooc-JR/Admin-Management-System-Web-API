const courseCategoryService = require("../service/courseCategoryService");

const addCourseCategoryAsync = async (req, res) => {
  let courseCategory = {
    CategoryName: req.body.CategoryName,
    Level: req.body.Level?req.body.Level:0,
    ParentID: req.body.ParentID?req.body.ParentID:0,
    Notes: req.body.Notes ? req.body.Notes : "",
  };
  let result = await courseCategoryService.addCourseCategoryAsync(courseCategory);
  return res.sendCommonValue(
    result.data,
    result.msg,
    result.isSuccess ? 201 : 400
    );
};

const getAllCourseCategoryAsync = async (req, res) => {
  let page = parseInt(req.params.page);
  let pageSize = parseInt(req.params.pageSize);
  console.log(page)
  const result = await courseCategoryService.getAllCourseCategoryAsync(page,pageSize);
  res.sendCommonValue(
    result.data,
    result.msg,
    result.isSuccess ? 200 : 400
  );
};

const getCourseCategoryByIdAsync = async (req, res) => {
  const id = req.params.courseCategoryId;
  const result = await courseCategoryService.getCourseCategoryById(id);
  res.sendCommonValue(
    result.data,
    result.msg,
    result.isSuccess ? 200 : 400
  );
};

const updateCourseCategoryAsync = async (req, res) => {
  let courseCategory = {};
  courseCategory.id = req.params.courseCategoryId;
  courseCategory.CategoryName = req.body.CategoryName;
  courseCategory.Level = req.body.Level;
  courseCategory.ParentID = req.body.ParentID;
  courseCategory.Notes = req.body.Notes;
  let result = await courseCategoryService.updateCourseCategoryAsync(courseCategory);
  res.sendCommonValue(
    result.data,
    result.msg,
    result.isSuccess ? 200 : 400
  );
};

const deleteCourseCategoryByIdAsync = async (req, res) => {
  const id = req.params.courseCategoryId;
  const result = await courseCategoryService.deleteCourseCategoryByIdAsync(id);
  res.sendCommonValue(
    result.data,
    result.msg,
    result.isSuccess ? 200 : 400
  );
};

module.exports = {
  addCourseCategoryAsync,
  getAllCourseCategoryAsync,
  getCourseCategoryByIdAsync,
  updateCourseCategoryAsync,
  deleteCourseCategoryByIdAsync
}
