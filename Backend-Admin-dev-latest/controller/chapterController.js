const chapterService = require("../service/chapterService");

// Add a new chapter
const addChapterAsync = async (req, res) => {
    const chapterData = {
        CourseID: req.body.CourseID,  // CourseID is required
        ChapterTitle: req.body.ChapterTitle,
        ChapterDescription: req.body.ChapterDescription,
        VideoURL: req.body.VideoURL,
        isCompleted: req.body.isCompleted || 0, // Default value is 0
        ChapterOrder: req.body.ChapterOrder,
    };

    try {
        const result = await chapterService.addChapterAsync(chapterData);
        if (result.isSuccess) {
            res.status(201).json({ message: 'Chapter added successfully', chapterId: result.data.insertId });
        } else {
            res.status(400).json({ message: 'Failed to add chapter' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all chapters for a course
const getAllChaptersByCourseIdAsync = async (req, res) => {
    const courseId = parseInt(req.params.courseId);

    try {
        const result = await chapterService.getAllChaptersByCourseIdAsync(courseId);
        res.sendCommonValue(
            result.data,
            result.message,
            result.isSuccess ? 200 : 400
        );
    } catch (error) {
        console.error('Error retrieving chapters:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// Get a chapter by ID
const getChapterByIdAsync = async (req, res) => {
    try {
        const courseId = parseInt(req.params.courseId);
        const chapterId = parseInt(req.params.chapterId);

        // Get the chapter by course and ID
        const result = await chapterService.getChapterByCourseAndIdAsync(courseId, chapterId);

        res.status(result.isSuccess ? 200 : 404).json({
            data: result.data,
            message: result.message
        });
    } catch (error) {
        console.error("Error retrieving chapter by ID:", error);
        res.status(500).json({ message: "Server Error" });
    }
};



// Update a chapter by courseId and chapterOrder
const updateChapterByCourseAndOrderAsync = async (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const chapterOrder = parseInt(req.params.chapterOrder);

  let chapter = {
    courseId: courseId,
    chapterOrder: chapterOrder,
    ChapterTitle: req.body.ChapterTitle,
    ChapterDescription: req.body.ChapterDescription,
    VideoURL: req.body.VideoURL,
    isCompleted: req.body.isCompleted === "true" || req.body.isCompleted === true,
    ChapterOrder: req.body.ChapterOrder,
  };

  let result = await chapterService.updateChapterByCourseAndOrderAsync(courseId, chapterOrder, chapter);
  if (result.isSuccess) {
    res.sendCommonValue({}, "Chapter updated successfully", 200);
  } else {
    console.error(result.message);
    res.sendCommonValue({}, "Failed to update chapter", 400);
  }
};



// Delete a chapter by course ID and chapter order
const deleteChapterByCourseAndOrderAsync = async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId);
    const chapterOrder = parseInt(req.params.chapterOrder);

    // Validate the courseId and chapterOrder
    if (isNaN(courseId) || isNaN(chapterOrder)) {
      console.error(`Invalid courseId (${courseId}) or chapterOrder (${chapterOrder})`);
      return res.sendCommonValue({}, "Invalid course ID or chapter order", 400);
    }

    // Log debug information
    console.log(`Deleting chapter with CourseID: ${courseId}, ChapterOrder: ${chapterOrder}`);

    // Call the service layer to delete the chapter
    const result = await chapterService.deleteChapterByCourseAndOrderAsync(courseId, chapterOrder);

    // Check if the deletion was successful
    if (result.isSuccess) {
      console.log(`Chapter deleted successfully for CourseID: ${courseId}, ChapterOrder: ${chapterOrder}`);
      return res.sendCommonValue({}, "Chapter deleted successfully", 200);
    } else {
      console.error(`Failed to delete chapter: ${result.message}`);
      return res.sendCommonValue({}, result.message || "Failed to delete chapter", result.status || 400);
    }
  } catch (error) {
    console.error("Error deleting chapter:", error);
    return res.sendCommonValue({}, "Internal server error", 500);
  }
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

const getChaptersByCourseIdWithPaginationAsync = async (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    try {
        // 调用修改后的 service 层函数
        const result = await chapterService.getAllChaptersByPaginationAsync(courseId, page, pageSize);

        if (result.isSuccess) {
            return res.status(200).json({
                success: true,
                data: {
                    chapters: result.data.items,
                    total: result.data.total,
                    currentPage: page,
                    totalPages: Math.ceil(result.data.total / pageSize),
                },
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No chapters found",
            });
        }
    } catch (error) {
        console.error('Error fetching paginated chapters:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};



// Export functions
module.exports = {
  addChapterAsync,
  getAllChaptersByCourseIdAsync,
  getChapterByIdAsync,
  updateChapterByCourseAndOrderAsync,
  deleteChapterByCourseAndOrderAsync,
  markChapterAsCompletedAsync,
  getChaptersByCourseIdWithPaginationAsync
};
