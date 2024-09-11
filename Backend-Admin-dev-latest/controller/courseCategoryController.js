const courseCategoryService = require("../service/courseCategoryService");

const addCourseCategoryAsync = async (req, res) => {
  let courseCategory = {
    CategoryName: req.body.CategoryName,
    Level: req.body.Level ? req.body.Level : 0,
    ParentID: req.body.ParentID ? req.body.ParentID : 0,
    Notes: req.body.Notes ? req.body.Notes : "",
  };
  let result = await courseCategoryService.addCourseCategoryAsync(
    courseCategory
  );
  return res.sendCommonValue(
    result.data,
    result.msg,
    result.isSuccess ? 201 : 400
  );
};

const getAllCourseCategoryAsync = async (req, res) => {
  const result = await courseCategoryService.getAllCourseCategoryAsync();
  res.sendCommonValue(
    result.data,
    result.msg,
    result.isSuccess ? 200 : 400
  );
};

const getCourseCategoryByIdAsync = async (req, res) => {
  console.log('========getCourseCategoryByIdAsync');
  const id = req.params.courseCategoryId;
  const result = await courseCategoryService.getCourseCategoryById(id);
  res.sendCommonValue(result.data, result.msg, result.isSuccess ? 200 : 400);
};

const updateCourseCategoryAsync = async (req, res) => {
  let courseCategory = {};
  courseCategory.id = req.params.courseCategoryId;
  courseCategory.CategoryName = req.body.CategoryName;
  courseCategory.Level = req.body.Level;
  courseCategory.ParentID = req.body.ParentID;
  courseCategory.Notes = req.body.Notes;
  let result = await courseCategoryService.updateCourseCategoryAsync(
    courseCategory
  );
  res.sendCommonValue(result.data, result.msg, result.isSuccess ? 200 : 400);
};

const deleteCourseCategoryByIdAsync = async (req, res) => {
  const id = req.params.courseCategoryId;
  const result = await courseCategoryService.deleteCourseCategoryByIdAsync(id);
  res.sendCommonValue(result.data, result.msg, result.isSuccess ? 200 : 400);
};
const getAllCourseCategoryByPageAsync = async (req, res) => {
  console.log("=====getAllCourseCategoryByPageAsync")
  
  const page = parseInt(req.params.page) || 1;
  const pageSize = parseInt(req.params.pageSize) || 10;
  const result = await courseCategoryService.getAllCourseCategoryByPage(
    page,
    pageSize
  );
  res.sendCommonValue(
    result.data,
    result.message,
    result.isSuccess ? 200 : 400
  );
};
const getAllCourseCategoryLevelAsync = async (req, res) => {
  console.log('========');
  const level = parseInt(req.params.level) || -1;
  const result = await courseCategoryService.getAllCourseCategoryLevelAsync(
    level
  );
  res.sendCommonValue(
    result.data,
    result.message,
    result.isSuccess ? 200 : 400
  );
};
const getAllCourseCategoryByPageAsync = async (req, res) => {
  const page = parseInt(req.params.page) || 1;
  const pageSize = parseInt(req.params.pageSize) || 10;
  const result = await courseCategoryService.getAllCourseCategoryByPage(page, pageSize);
  res.sendCommonValue(
    result.data,
    result.message,
    result.isSuccess ? 200 : 400
  );

}
const deleteMutiCourseCategoryAsync=async(req, res)=>{
  const ids=req.body.ids
  const result=courseCategoryService.deleteCourseCategoryByBatchAsync(ids)
  res.sendCommonValue(
    result.data,
    result.msg,
    result.isSuccess ? 200 : 400
  )
}


module.exports = {
  addCourseCategoryAsync,
  getAllCourseCategoryAsync,
  getCourseCategoryByIdAsync,
  getAllCourseCategoryByPageAsync,
  updateCourseCategoryAsync,
  deleteCourseCategoryByIdAsync,
  deleteMutiCourseCategoryAsync
}

