const chapterService = require("../service/chapterService");

// Add a new chapter
const addChapterAsync = async (req, res) => {
  let chapter = {
    CourseID: req.body.CourseID,
    ChapterTitle: req.body.ChapterTitle,
    ChapterDescription: req.body.ChapterDescription,
    VideoURL: req.body.VideoURL,
    ChapterOrder: req.body.ChapterOrder,
  };

  let result = await chapterService.addChapterAsync(chapter);
  if (result.isSuccess) {
    res.sendCommonValue({}, "Chapter added successfully", 201);
  } else {
    res.sendCommonValue({}, "Failed to add chapter", 500);
  }
};

// Get all chapters for a course
const getAllChaptersByCourseIdAsync = async (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const result = await chapterService.getAllChaptersByCourseIdAsync(courseId);
  res.sendCommonValue(
    result.data,
    result.message,
    result.isSuccess ? 200 : 400
  );
};

// Get a chapter by ID
const getChapterByIdAsync = async (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const chapterId = parseInt(req.params.chapterId);
    
    // Call the getChapterByCourseAndIdAsync method from chapterService
    const result = await chapterService.getChapterByCourseAndIdAsync(courseId, chapterId);

    res.sendCommonValue(
        result.data,
        result.message,
        result.isSuccess ? 200 : 400
    );
};


// Update a chapter
const updateChapterAsync = async (req, res) => {
  let chapter = {
    id: parseInt(req.params.id),
    ChapterTitle: req.body.ChapterTitle,
    ChapterDescription: req.body.ChapterDescription,
    VideoURL: req.body.VideoURL,
    isCompleted: req.body.isCompleted === "true",
    ChapterOrder: req.body.ChapterOrder,
  };

  let result = await chapterService.updateChapterAsync(chapter);
  if (result.isSuccess) {
    res.sendCommonValue({}, "Chapter updated successfully", 200);
  } else {
    res.sendCommonValue({}, "Failed to update chapter", 400);
  }
};

// Delete a chapter by ID
const deleteChapterByIdAsync = async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await chapterService.deleteChapterByIdAsync(id);
  res.sendCommonValue(
    result.data,
    result.message,
    result.isSuccess ? 200 : 400
  );
};

// Progress tracking
const markChapterAsCompletedAsync = async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await chapterService.markChapterAsCompletedAsync(id);
  res.sendCommonValue(
    result.data,
    result.message,
    result.isSuccess ? 200 : 400
  );
};

// Export functions
module.exports = {
  addChapterAsync,
  getAllChaptersByCourseIdAsync,
  getChapterByIdAsync,
  updateChapterAsync,
  deleteChapterByIdAsync,
  markChapterAsCompletedAsync,
};
